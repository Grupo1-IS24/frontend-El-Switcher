import MovementCard from '../MovementCard/MovementCard';

const BackMovCardHand = ({ totalMovCards = 0 }) => {
  return (
    <div className='flex flex-row gap-6' data-testid='back-mov-card-hand'>
      {new Array(totalMovCards).fill().map((_, index) => (
        <MovementCard key={index} movement='back' />
      ))}
    </div>
  );
};

export default BackMovCardHand;
