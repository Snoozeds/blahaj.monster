// Mouse trails
document.addEventListener('mousemove', function(e) {
    const trail = document.createElement('div');
    trail.className = 'trail';
  
    // Random Rotation and Angle
    const randomAngle = Math.random() * 2 * Math.PI;
    const randomDistance = Math.random() * 50;
    const offsetX = Math.cos(randomAngle) * randomDistance;
    const offsetY = Math.sin(randomAngle) * randomDistance;
  
    trail.style.left = `${e.pageX + offsetX}px`; 
    trail.style.top = `${e.pageY + offsetY}px`;
  
    const initialRotation = Math.floor(Math.random() * 360);
    trail.style.transform = `translate(-50%, -50%) rotate(${initialRotation}deg)`;
  
    document.body.appendChild(trail);
  
    trail.addEventListener('animationend', () => {
      trail.remove();
    });
  });

  const galleryContainer = document.querySelector('.gallery-container');
  
