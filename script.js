/*all JS will have to be written inside this braces, but it will load after HTML - safer than putting it at the end of HTML
DOMContentLoaded is a built-in event which means the whole document was loaded*/

document.addEventListener('DOMContentLoaded', () => {
    
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const alert = document.getElementById('alert');
    let isJumping = false;
    let gravity = 0.9;
    let isGameOver = false;

    /*make the dino move. e stands for event
        keycode.info to check the codes */

    function control(e) {
        if (e.keyCode === 32) {
            if (!isJumping) {
                isJumping = true; // so that dino cannot jump mid jump. if he isn't jumping and we press space he will jump
                jump()
            }
        }
    }
    /* keyup is an actual event built-in JS which says which key was pressed. *key press says which character was entered (case sentisitve)
    second parameter is a function which it will envoke */
    document.addEventListener('keyup', control);
    let position = 0;

    //to make it look like animation it will move 30px each time in a set interval (in miliseconds) until it reaches 150px
    function jump()  {
        let count = 0;
        let timerId = setInterval(function () {

            //move down (w/o the clearInterval the up and down function would still be going)

            if(count === 15) {
                console.log('down');
                clearInterval(timerId);
                let downTimerId = setInterval(function () {
                    if(count === 0) {
                        clearInterval(downTimerId);
                        isJumping = false;
                    }
                    position -= 5;
                    count --;
                    position = position * gravity;
                    dino.style.bottom = position + 'px';
                }, 20)
                
            }

            //move up
            console.log('up');
            position += 30;
            count ++;
            position = position * gravity;
            dino.style.bottom = position + 'px';
        }, 20)
    }


    function generateObstacles () {
        let randomTime = Math.random() * 3000; //we are getting a number from 0 to 4000 miliseconds at random
        let obstaclePosition = 1000;
        const obstacle = document.createElement('div');
        if (!isGameOver) obstacle.classList.add('obstacle');
        grid.appendChild(obstacle); //puts the newly-created obstacle element (a div) into an already existing 'grid' div
        obstacle.style.left = obstaclePosition + 'px'; //actually puts it on the right of the dino

        //make it move the same way dino jumps. timerId can be reused as it's in another function
        let timerId = setInterval(function() {
            if (obstaclePosition > 0 && obstaclePosition < 120 && position < 60) { //Dino has 60px, so if the obstacle is closer than 60 and the dino is lower than 60 then they touch and the game is over
                clearInterval(timerId);
                alert.innerHTML = 'Game Over!';
                isGameOver = true;
                //remove all children
                while (grid.firstChild) { 
                    grid.removeChild(grid.lastChild) //it will keep on removing lastchild until the firstChild stops existing
                }
            }
            
            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + 'px';
        }, 20)

        if (!isGameOver) {
            setTimeout(generateObstacles, randomTime); //it's a neverending creation of obstacles in a random time
        }
    }
    generateObstacles();
})