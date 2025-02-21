import React from "react";
import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { Review } from "@prisma/client";
import ReviewRepository from "../../src/repositories/ReviewRepository";

const CourseReviews: React.FC = () => {
  return (
    <div className="bg-gray-200 p-4 min-h-screen">
      {/* Course Header */}
      <div className="bg-gray-400 p-2 mb-4">
        <h1 className="text-lg">01418111 - Introduction to Computer Science</h1>
      </div>

      {/* Course Description */}
      <div className="bg-gray-300 p-4 mb-4">
        <p>Description</p>
      </div>

      {/* Buttons */}
      <div className="flex mb-4">
        <button className="bg-gray-400 text-black px-4 py-2 mr-2">
          รีวิวทั้งหมด
        </button>
        <button className="bg-gray-400 text-black px-4 py-2 mr-2">
          คะแนนรวมวิชานี้ : 0/10
        </button>
        <button className="bg-green-500 text-black px-4 py-2">
          สร้างรีวิว
        </button>
      </div>

      {/* Reviews Section */}
      {["user01", "User02"].map((user, index) => (
        <div key={index} className="bg-gray-500 p-4 mb-4">
          <div className="flex items-center mb-2">
            <div className="bg-gray-300 p-2 flex-1">{user}</div>
            <div className="bg-gray-300 p-2 ml-2">0/10</div>
          </div>

          <button className="bg-gray-300 p-4 mb-2 w-full text-left">
            <p>Description - ทำ Block นี้เป็น Button ทั้ง Block ได้หรือไม่</p>
          </button>

          <button className="bg-red-500 text-white px-4 py-2">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CourseReviews;
