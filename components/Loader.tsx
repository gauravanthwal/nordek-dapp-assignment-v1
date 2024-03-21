import React from "react";
import { Puff } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-3">
      {/* <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-700" /> */}
      <Puff
        height="80"
        width="80"
        radius={1}
        color="skyblue"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
