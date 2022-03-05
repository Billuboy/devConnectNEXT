async function b() {
  return 'Hello';
}

(async function a() {
  console.log('processing...');
  await new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve('some');
    }, 3000)
  );
  const data = await b();
  console.log('data-received', data);
})();
