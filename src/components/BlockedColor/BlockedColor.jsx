import { useContext } from 'react';
import { GameContext } from '../../contexts/GameProvider';
import { getBlockedCardImagePath } from '../../utils/assetUtils';

const BlockedColor = () => {
  const { blockedColor } = useContext(GameContext);

  return (
    <div className='flex items-center gap-2 h-16'>
      <p className='lekton-bold text-xl'>
        {blockedColor ? 'El color bloqueado es:' : 'No hay color bloqueado'}
      </p>
      {blockedColor && (
        <img
          src={getBlockedCardImagePath(blockedColor)}
          className='w-[40px] h-[70px]'
          alt={`Color bloqueado es ${blockedColor}`}
        />
      )}
    </div>
  );
};

export default BlockedColor;
