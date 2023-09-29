import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import React from 'react';

export const DELETE = async (request, { params }) => {
  const id = params.id;
  console.log(id);
  const post = await prisma.post.delete({
    where: { id },
  });
  return NextResponse.json(request);
};
