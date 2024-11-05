import formatTime from '../../utils/formatTime';

const Timer = ({ time }) => {
  let timeColorClass = 'text-[#60D394]';

  if (time <= 20) {
    timeColorClass = 'text-[#FF0000]';
  } else if (time <= 60) {
    timeColorClass = 'text-[#FFFF00]';
  }

  return (
    <span
      className={`w-[124px] h-[50px] rounded-[8px] bg-[#0C0C0C] ${timeColorClass} text-[36px] font-semibold flex justify-center`}
    >
      {formatTime(time)}
    </span>
  );
};

export default Timer;
