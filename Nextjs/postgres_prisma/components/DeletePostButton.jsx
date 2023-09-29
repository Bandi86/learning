'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const DeletePostButton = ({ postId }) => {
  const router = useRouter();
  async function handleClick() {
    try {
      await axios.delete(`/api/post/${postId}`);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return <button onClick={handleClick}>X</button>;
};

export default DeletePostButton;
