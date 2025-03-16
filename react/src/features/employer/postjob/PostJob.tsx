import React from "react";
import PostJobForm from "./components/PostJobForm";
import { useParams } from "react-router-dom";

const PostJob: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = id;

  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols gap-y-2">
          <h1 className="font-bold text-textBlack text-xl">
            {isEditMode ? "Edit Job" : "Post New Job"}
          </h1>
          <p className="text-textGray text-sm max-w-[16rem] md:max-w-[32rem] md:text-lg">
            Manage your job postings and track applications with ease.
          </p>
        </div>
        <div className="py-14">
          <PostJobForm isEditMode={isEditMode} />
        </div>
      </div>
    </>
  );
};

export default PostJob;
