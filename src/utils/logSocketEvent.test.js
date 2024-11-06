import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import logSocketEvent from './logSocketEvent';

describe('logSocketEvent', () => {
  const originalConsoleLog = console.log;
  let consoleLogMock;

  beforeEach(() => {
    consoleLogMock = vi.fn();
    console.log = consoleLogMock;
  });

  afterEach(() => {
    console.log = originalConsoleLog;
  });

  it('should log the event and data for non-timer events', () => {
    const eventName = 'message';
    const data = { text: 'Hello, world!' };

    logSocketEvent(eventName, data);

    expect(consoleLogMock).toHaveBeenCalledWith(
      '%cSocket Event: message',
      'color: blue; font-weight: bold;'
    );
    expect(consoleLogMock).toHaveBeenCalledWith(
      '%cData:',
      'color: green; font-weight: bold;',
      data
    );
    expect(consoleLogMock).toHaveBeenCalledWith('\n');
  });

  it('should log the event and data for timer events with valid time (120)', () => {
    const eventName = 'timer';
    const data = { time: 120 };

    logSocketEvent(eventName, data);

    expect(consoleLogMock).toHaveBeenCalledWith(
      '%cSocket Event: timer',
      'color: blue; font-weight: bold;'
    );
    expect(consoleLogMock).toHaveBeenCalledWith(
      '%cData:',
      'color: green; font-weight: bold;',
      data
    );
    expect(consoleLogMock).toHaveBeenCalledWith('\n');
  });

  it('should log the event and data for timer events with valid time (60)', () => {
    const eventName = 'timer';
    const data = { time: 60 };

    logSocketEvent(eventName, data);

    expect(consoleLogMock).toHaveBeenCalledWith(
      '%cSocket Event: timer',
      'color: blue; font-weight: bold;'
    );
    expect(consoleLogMock).toHaveBeenCalledWith(
      '%cData:',
      'color: green; font-weight: bold;',
      data
    );
    expect(consoleLogMock).toHaveBeenCalledWith('\n');
  });

  it('should log the event and data for timer events with valid time (1)', () => {
    const eventName = 'timer';
    const data = { time: 1 };

    logSocketEvent(eventName, data);

    expect(consoleLogMock).toHaveBeenCalledWith(
      '%cSocket Event: timer',
      'color: blue; font-weight: bold;'
    );
    expect(consoleLogMock).toHaveBeenCalledWith(
      '%cData:',
      'color: green; font-weight: bold;',
      data
    );
    expect(consoleLogMock).toHaveBeenCalledWith('\n');
  });

  it('should not log anything for timer events with invalid time', () => {
    const eventName = 'timer';
    const data = { time: 30 };

    logSocketEvent(eventName, data);

    expect(consoleLogMock).not.toHaveBeenCalled();
  });
});
