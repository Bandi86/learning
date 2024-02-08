import axios from 'axios'
import { useEffect, useState } from 'react'
import { postApi, userApi } from '../api'
import { useSelector } from 'react-redux'
import { UserRedux } from '../store/user/userSlice'
import { Button, Modal, Table } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { User } from '../types/currentUser'
import { FaCheck, FaTimes } from 'react-icons/fa'

const DashUsers = () => {
  const { currentUser } = useSelector((state: UserRedux) => state.user)
  const [users, setUsers] = useState<User[]>([])
  const [showModal, setShowModal] = useState(false)
  const [userIdToDelete, setUserIdToDelete] = useState('')
  const [showMore, setShowMore] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const startIndex = users.length
        const res = await axios.get(`${userApi}?startIndex=${startIndex}`, {
          withCredentials: true
        })

        if (res.data) {
          const newUsers = res.data.users.filter((user: User) => !users.some((u) => u._id === user._id))
          setUsers(prevUsers => [...prevUsers, ...newUsers])
          setShowMore(newUsers.length >= 9)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (currentUser?.isAdmin) {
      fetchUsers()
    }
  }, [currentUser?.isAdmin, currentUser?._id, users.length])

  const handleDeleteUser = async () => {
    setShowModal(false)
    try {
      const res = await axios.delete(`${userApi}/${userIdToDelete}`)
      if (res.status === 200) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete))
        setShowModal(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowMore = async () => {
    const startIndex = users.length
    try {
      const res = await axios.get(`${postApi}?userId=${currentUser?._id}&startIndex=${startIndex}`)
      if (res.status === 200) {
        setUsers((prev) => [...prev, ...res.data.users])
        if (res.data.users.length < 9) setShowMore(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {currentUser?.isAdmin && users.length > 0 ? (
            <>
              <Table hoverable className="shadow-md">
                <Table.Head>
                  <Table.HeadCell>Date created</Table.HeadCell>
                  <Table.HeadCell>User image</Table.HeadCell>
                  <Table.HeadCell>Username</Table.HeadCell>
                  <Table.HeadCell>Email</Table.HeadCell>
                  <Table.HeadCell>Admin</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                {users.map((user: User) => (
                  <Table.Body key={user._id} className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}
                      </Table.Cell>
                      <Table.Cell>
                        <img
                          src={user.profilePicture}
                          alt={user.username}
                          className="w-10 h-10 object-cover rounded-full bg-gray-500"
                        />
                      </Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>
                        {user.isAdmin ? <FaCheck className='text-green-600' /> : <FaTimes className="text-red-500" />}
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          onClick={() => {
                            setShowModal(true)
                            setUserIdToDelete(user._id ?? '')
                          }}
                          className="font-medium text-red-500 hover:underline cursor-pointer"
                        >
                          Delete
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
              {showMore && (
                <button
                  onClick={handleShowMore}
                  className="w-full text-teal-500 self-center text-sm py-7"
                >
                  Show more
                </button>
              )}
            </>
          ) : (
            <p>You have no users yet!</p>
          )}
        </>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashUsers
