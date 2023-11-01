import React from "react";

const FileInput = ({ previewUrl, onFileChange }) => {
  return (
    <div className="mb-4">
      <div className="mt-2 h-80 flex flex-col items-center justify-center rounded-lg border focus:outline-none focus:ring focus:border-blue-300 px-6 py-10">
        {/* 이미지 미리보기 */}
        {previewUrl && (
          <img
            src={previewUrl}
            alt="미리보기"
            className="mx-auto max-h-40 overflow-y-auto"
          />
        )}
        <div className="mt-4 flex text-sm leading-6 text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            <p>사진을 첨부해주세요.</p>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onFileChange}
            />
          </label>
        </div>
        <p className="text-xs leading-5 text-gray-600">10mb까지 첨부 가능</p>
      </div>
    </div>
  );
};

export default FileInput;
