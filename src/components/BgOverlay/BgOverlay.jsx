import homeBg from '../../assets/img/home-bg.jpeg';

const BackgroundOverlay = () => {
  return (
    <div
      className='fixed inset-0 bg-cover bg-center'
      style={{ backgroundImage: `url(${homeBg})` }}
      data-testid='background-overlay'
    >
      {/* dark layer */}
      <div className='fixed inset-0 bg-[#0c0c0c] opacity-80'></div>
    </div>
  );
};

export default BackgroundOverlay;
