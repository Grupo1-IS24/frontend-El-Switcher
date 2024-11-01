import { useContext } from 'react';
import { GameContext } from '../../contexts/GameProvider';
import { BLOCKED_CARDS_ASSETS_PATH } from '../../constants/assetPaths';

const BlockedColor = () => {
  const { blockedColor } = useContext(GameContext);

  return (
    <>
      {blockedColor && (
        <div className='flex items-center gap-2'>
          <p className='lekton-bold text-xl'>El color bloqueado es:</p>
          <img
            src={`${BLOCKED_CARDS_ASSETS_PATH}/blocked_card_${blockedColor.toLowerCase()}.svg`}
            className='w-[40px] h-[70px]'
            alt={`Color bloqueado es ${blockedColor}`}
          />
        </div>
      )}
    </>
  );
};

export default BlockedColor;
