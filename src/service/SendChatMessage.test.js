import { describe, it, expect, vi, afterEach } from 'vitest';
import { apiService } from './axiosConfig';
import { sendChatMessage } from './SendChatMessage';
import {
  ERROR_MESSAGE_INVALID,
  ERROR_MESSAGE_SEND_FAILURE,
  ERROR_MESSAGE_UNEXPECTED,
} from '../constants/chatErrorMessages';

vi.mock('./axiosConfig', () => ({
  apiService: {
    post: vi.fn(),
  },
}));

describe('sendChatMessage', () => {
  const VALID_PLAYER_ID = 1;
  const VALID_GAME_ID = 123;
  const VALID_MESSAGE = 'Hello, World!';
  const INVALID_PLAYER_ID = -5; // PlayerID must be a positive number
  const INVALID_MESSAGE = 12345; // Message must be a string

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should send a message successfully when data is valid', async () => {
    apiService.post.mockResolvedValueOnce({ status: 200 });

    await sendChatMessage(VALID_PLAYER_ID, VALID_GAME_ID, VALID_MESSAGE);

    expect(apiService.post).toHaveBeenCalledWith(
      `/game/${VALID_GAME_ID}/send_message`,
      {
        playerId: VALID_PLAYER_ID,
        message: VALID_MESSAGE,
      }
    );
  });

  it('should throw a validation error when playerID is not a positive number', async () => {
    await expect(
      sendChatMessage(INVALID_PLAYER_ID, VALID_GAME_ID, VALID_MESSAGE)
    ).rejects.toThrow(ERROR_MESSAGE_INVALID);
    expect(apiService.post).not.toHaveBeenCalled();
  });

  it('should throw a validation error when message is not a string', async () => {
    await expect(
      sendChatMessage(VALID_PLAYER_ID, VALID_GAME_ID, INVALID_MESSAGE)
    ).rejects.toThrow(ERROR_MESSAGE_INVALID);
    expect(apiService.post).not.toHaveBeenCalled();
  });

  it('should handle an axios error gracefully', async () => {
    const axiosError = new Error('Network Error');
    axiosError.isAxiosError = true;
    apiService.post.mockRejectedValueOnce(axiosError);

    await expect(
      sendChatMessage(VALID_PLAYER_ID, VALID_GAME_ID, VALID_MESSAGE)
    ).rejects.toThrow(ERROR_MESSAGE_SEND_FAILURE);
  });

  it('should handle unexpected errors gracefully', async () => {
    const unexpectedError = new Error('Unexpected Error');
    apiService.post.mockRejectedValueOnce(unexpectedError);

    await expect(
      sendChatMessage(VALID_PLAYER_ID, VALID_GAME_ID, VALID_MESSAGE)
    ).rejects.toThrow(ERROR_MESSAGE_UNEXPECTED);
  });
});
