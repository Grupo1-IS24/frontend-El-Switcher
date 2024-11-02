import { useContext } from 'react';
import { GameContext } from '../../contexts/GameProvider';
import { BLOCKED_CARDS_ASSETS_PATH } from '../../constants/assetPaths';

const BlockedColor = () => {
  const { blockedColor } = useContext(GameContext);

  return (
    <div className='flex items-center gap-2 h-16'>
      <p className='lekton-bold text-xl'>
        {blockedColor ? 'El color bloqueado es:' : 'No hay color bloqueado'}
      </p>
      {blockedColor && (
        <img
          src={`${BLOCKED_CARDS_ASSETS_PATH}/blocked_card_${blockedColor.toLowerCase()}.svg`}
          className='w-[40px] h-[70px]'
          alt={`Color bloqueado es ${blockedColor}`}
        />
      )}
    </div>
  );
};

export default BlockedColor;
