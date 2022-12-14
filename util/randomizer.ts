export default function randomizer():string
{
  const artist = 
  [
    'crisalys',
    'xiaobanbei_milk',
    'zygocactus',
    'takato_kurosuke',
    'moyazou_(kitaguni_moyashi_seizoujo)',
    'mota',
    'hakuurei_amano',
    'yukie_(kusaka_shi)',
    'awakumo'
  ]

  for (let i = artist.length - 1; i > 0; i--) 
  {
    let j = Math.floor(Math.random() * i);
    let k = artist[i];
    artist[i] = artist[j];
    artist[j] = k;
  }

  return artist[Math.floor(Math.random() * artist.length)]
}