const LoadingLobby = () => {
  const renderDivs = (count, className) => {
    return Array.from({ length: count }).map((_, index) => (
      <div className={className} key={index}></div>
    ));
  };

  return (
    <div
      className='bg-[#0c0c0c] rounded-xl text-[#f1f1f1] text-center flex flex-col gap-16 px-8 py-12 w-[660px] m-auto h-[487px]'
      data-testid='loading-lobby'
    >
      <div className='lekton-bold text-6xl underline animate-pulse bg-gray-700 rounded-2xl h-[60px]'></div>
      <div className='flex flex-col gap-2'>
        {renderDivs(
          3,
          'lekton-bold text-4xl animate-pulse bg-gray-700 h-[40px] rounded-2xl'
        )}
      </div>
      <div className='flex flex-row gap-5 justify-center'>
        {renderDivs(
          2,
          'animate-pulse w-[284px] h-[66px] bg-gray-700 rounded-xl'
        )}
      </div>
    </div>
  );
};

export default LoadingLobby;
