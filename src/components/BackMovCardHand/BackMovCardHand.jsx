import MovementCard from '../MovementCard/MovementCard';

const BackMovCardHand = ({ totalMovCards = 0 }) => {
  return (
    <div className='flex flex-row gap-6'>
      {new Array(totalMovCards).fill().map((_, index) => (
        <MovementCard key={index} movement='back' />
      ))}
    </div>
  );
};

export default BackMovCardHand;
