let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let p = document.querySelector('p');
let ptime = document.querySelector('.time');

//Размер одной клетки
let grid = 16;
//Скорость змейки
let count = 0;
//змея
let snake = {
    //начальные координаты
    x: 160,
    y: 160,
    //смещение
    dx: grid,
    dy: 0,
    //хвост
    cells: [],
    //начальная длина змеи
    maxCells: 4
};
//Еда
let apple = {
    x: 320,
    y: 320
};

let time = 10;
let times = 0;


function  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function loop() {
    requestAnimationFrame(loop);
    if (++count < 4) {
        return;
    }
    if (++times >= 15) {
        times = 0;
        time--;
    }

    times++;

    let m = Math.floor(time / 60);
    let s = time % 60;
    if (m <10) {m = '0' + m}
    if (s <10) {s = '0' + s}
    ptime.textContent = 'Время ' + m + ':' + s;
    count = 0;

    if (time == 0) {
        alert('Конец игры');
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
        time = 120;
    }

    //очистка игрово поля
    context.clearRect(0, 0, canvas.width, canvas.height);
    //двигать змейку
    snake.x += snake.dx;
    snake.y += snake.dy;

    //стена
    if(snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if(snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    snake.cells.unshift({x: snake.x, y: snake.y});

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    context.fillStyle = 'green';

    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            p.textContent = 'Количество набранных очков: ' + (snake.maxCells - 4);
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
        }

        for (let i = index + 1; i < snake.cells.length; i++ ) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;
                apple.x = getRandomInt(0, 25) * grid;
                apple.y = getRandomInt(0, 25) * grid;
            }
        }
    });
}

document.addEventListener('keydown', function (e){
    //Влево
    if (e.which === 37  &&  snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    //Вниз
    if (e.which === 40  &&  snake.dy === 0) {
        snake.dx = 0;
        snake.dy = grid;
    }
    //Вправо
    if (e.which === 39  &&  snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    //Вверх
    if (e.which === 38  &&  snake.dy === 0) {
        snake.dx = 0;
        snake.dy = -grid;
    }
})

requestAnimationFrame(loop);


