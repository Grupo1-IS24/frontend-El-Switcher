import formatTime from '../../utils/formatTime';

const Timer = ({ time }) => {
  let timeColorClass = 'text-[#22c55e]';

  if (time <= 20) {
    timeColorClass = 'text-[#ef4444]';
  } else if (time <= 60) {
    timeColorClass = 'text-[#eab308]';
  }

  return (
    <span
      className={`w-[100px] h-[40px] rounded-[8px] bg-[#0C0C0C] ${timeColorClass} text-[26px] font-semibold flex justify-center`}
    >
      {formatTime(time)}
    </span>
  );
};

export default Timer;
