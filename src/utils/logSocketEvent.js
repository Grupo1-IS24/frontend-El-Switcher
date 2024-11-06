const logSocketEvent = (eventName, data) => {
  if (eventName === 'timer' && ![120, 60, 1].includes(data.time)) {
    return;
  }

  console.log(
    `%cSocket Event: ${eventName}`,
    'color: blue; font-weight: bold;'
  );
  console.log('%cData:', 'color: green; font-weight: bold;', data);
  console.log('\n');
};

export default logSocketEvent;
