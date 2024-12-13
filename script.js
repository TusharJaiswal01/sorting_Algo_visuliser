let array = [];

// DOM Elements
const arrayContainer = document.getElementById('array-container');
const generateArrayBtn = document.getElementById('generateArrayBtn');
const bubbleSortBtn = document.getElementById('bubbleSortBtn');
const selectionSortBtn = document.getElementById('selectionSortBtn');
const insertionSortBtn = document.getElementById('insertionSortBtn');
const mergeSortBtn = document.getElementById('mergeSortBtn');

// Navbar Active State
const homeLink = document.getElementById('homeLink');
const aboutLink = document.getElementById('aboutLink');
const contactLink = document.getElementById('contactLink');

// Generate a new random array
function generateArray() {
    array = [];
    for (let i = 0; i < 50; i++) {
        array.push(Math.floor(Math.random() * 100) + 5); // Numbers between 5 and 100
    }
    drawArray();
}

// Draw the array on the screen
function drawArray() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`; // Scale the height of the bar
        arrayContainer.appendChild(bar);
    });
}

// Bubble Sort Algorithm
async function bubbleSort() {
    let arr = [...array];
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                drawArrayWithDelay(arr);
                await new Promise(resolve => setTimeout(resolve, 100)); // Slower speed
            }
        }
    }
}

// Selection Sort Algorithm
async function selectionSort() {
    let arr = [...array];
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
            drawArrayWithDelay(arr);
            await new Promise(resolve => setTimeout(resolve, 100)); // Slower speed
        }
    }
}

// Insertion Sort Algorithm
async function insertionSort() {
    let arr = [...array];
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
            drawArrayWithDelay(arr);
            await new Promise(resolve => setTimeout(resolve, 100)); // Slower speed
        }
        arr[j + 1] = key;
    }
    drawArrayWithDelay(arr);
}

// Merge Sort Algorithm
async function mergeSort() {
    let arr = [...array];
    await mergeSortHelper(arr, 0, arr.length - 1);
}

async function mergeSortHelper(arr, left, right) {
    if (left >= right) return;
    const middle = Math.floor((left + right) / 2);
    await mergeSortHelper(arr, left, middle);
    await mergeSortHelper(arr, middle + 1, right);
    await merge(arr, left, middle, right);
}

async function merge(arr, left, middle, right) {
    let leftArr = arr.slice(left, middle + 1);
    let rightArr = arr.slice(middle + 1, right + 1);
    let i = 0, j = 0, k = left;
    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] < rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
        drawArrayWithDelay(arr);
        await new Promise(resolve => setTimeout(resolve, 100)); // Slower speed
    }

    while (i < leftArr.length) {
        arr[k] = leftArr[i];
        i++;
        k++;
        drawArrayWithDelay(arr);
        await new Promise(resolve => setTimeout(resolve, 100)); // Slower speed
    }

    while (j < rightArr.length) {
        arr[k] = rightArr[j];
        j++;
        k++;
        drawArrayWithDelay(arr);
        await new Promise(resolve => setTimeout(resolve, 100)); // Slower speed
    }
}

// Function to draw the array with delays during sorting
function drawArrayWithDelay(arr) {
    arrayContainer.innerHTML = '';
    arr.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        arrayContainer.appendChild(bar);
    });
}

// Event Listeners for buttons
generateArrayBtn.addEventListener('click', generateArray);
bubbleSortBtn.addEventListener('click', bubbleSort);
selectionSortBtn.addEventListener('click', selectionSort);
insertionSortBtn.addEventListener('click', insertionSort);
mergeSortBtn.addEventListener('click', mergeSort);

// Set the active link in navbar based on the page
function setActivePage(page) {
    homeLink.classList.remove('active');
    aboutLink.classList.remove('active');
    contactLink.classList.remove('active');

    if (page === 'home') {
        homeLink.classList.add('active');
    } else if (page === 'about') {
        aboutLink.classList.add('active');
    } else if (page === 'contact') {
        contactLink.classList.add('active');
    }
}

// Initialize
generateArray();
setActivePage('home');
