// مثال بسيط في React Native لاستدعاء النظام المتكامل
const generateCinematic = async () => {
  const response = await fetch('http://localhost:8080/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      clips: '~/clips',
      music: '~/music/background.mp3',
      voiceover: '~/voiceover/narration.m4a'
    })
  });
  const result = await response.json();
  console.log('Generated:', result);
};