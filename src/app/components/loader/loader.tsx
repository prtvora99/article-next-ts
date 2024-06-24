const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[85vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
      <p className="mt-4">Please wait while we fetch the articles ..</p>
    </div>
  );
};

export default Loader;
