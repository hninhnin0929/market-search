"use client";
import { useFormState } from "react-dom";
import * as actions from "@/actions";

export default function Home() {
  const [formState, action] = useFormState(actions.searchByKeywords, {
    message: "",
  });

  const handleSearch = async () => {
    console.log("calling handle search");
    const searchData = {
      searchedKeywords: ["홈페이지", "정보", "시스템"],
      excludeKeywords: ["벽돌", "반"],
    };
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("backend data------------", data);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  return (
    <form action={action}>
      <div className="mx-auto max-w-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 my-3">
          나라장터 검색
        </h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="allowed_keywords"
            >
              허용할 키워드(쉼표로 구분)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="allowed_keywords"
              name="allowed_keywords"
              type="text"
              placeholder="정보,시스템,고도화,구축,홈페이지"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="excluded_keywords"
            >
              제외할 키워드(쉼표로 구분)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="excluded_keywords"
              name="excluded_keywords"
              type="text"
              placeholder="벽돌,전기공사,감리,설계용역"
            />
          </div>
          <label htmlFor="orderPlan" className="flex items-center">
            <input
              type="checkbox"
              id="orderPlan"
              className="form-checkbox h-5 w-5 text-indigo-600 my-3"
            />
            <span className="ml-2 text-gray-700">발주계획만</span>
          </label>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            //   onClick={handleSearch}
            >
              EXCEL다운로드
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-lg">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <h2 className="text-lg text-gray-900 font-semibold mb-2">
                검색된 결과
              </h2>
              <ul className="list-disc pl-5">
                <li>안산시 홈페이지 구축</li>
                <li>남양주 홈페이지 구축</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
