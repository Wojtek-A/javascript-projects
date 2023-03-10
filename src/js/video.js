import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iFrame = document.querySelector('iframe');
// const player = new Vimeo.Player(iFrame);
const player = new Vimeo(iFrame);

const savedTime = time => {
  localStorage.setItem('videoplayer-current-time', time.seconds);
};

player.on('timeupdate', throttle(savedTime, 1000));

const timeStorage = parseInt(localStorage.getItem('videoplayer-current-time'));

function startTime(timeStorage) {
  if (timeStorage < 571) {
    return timeStorage;
  } else return timeStorage === 0;
}

player
  .setCurrentTime(startTime(timeStorage))
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;
      default:
        break;
    }
  });
