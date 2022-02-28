console.log('hello js')

const SEAT_NUMBER_PER_ROW = [...Array(8).keys()]
const ROWS_NUMBER = [...Array(6).keys()]
const SELECTED_SEAT_CLASS = 'js-seat--selected'

/**
 * seatの選択数を取得する
 * @return {number}
 */
const getSelectedSeatsLength = () => {
    const bookingListSelected = 1
    const selectedSeats = document.getElementsByClassName(SELECTED_SEAT_CLASS)
    return selectedSeats.length - bookingListSelected
}

const rowTemplate = () => {
    return `
                <div class="js-row">
                  <div class="js-seat"></div>  
                  <div class="js-seat js-seat--left-second-row"></div>  
                  <div class="js-seat"></div>  
                  <div class="js-seat js-seat--occupied"></div>  
                  <div class="js-seat js-seat--occupied"></div>  
                  <div class="js-seat"></div>  
                  <div class="js-seat js-seat--right-second-row"></div>  
                  <div class="js-seat"></div>  
                </div>
            `
}

// 必要な要素を生成
const row = document.createElement('div')
row.className = 'js-row'

SEAT_NUMBER_PER_ROW.forEach(() => {
    const seat = document.createElement('div')
    seat.className = 'js-seat'
    row.appendChild(seat)
})

const screenWrapper = document.querySelector('.screen-wrapper')

const count = getSelectedSeatsLength()
const selectedCountElement = document.querySelector('.selected-count')
selectedCountElement.textContent = String(count)

/**
 * seatの選択状態を切り替える
 * @param {number} selected
 * @param {number} price
 * @return {number}
 */
const calculateSeatPrices = (selected, price) => {
    return selected * price
}

const sumElement = document.querySelector('.sum')
const prices = calculateSeatPrices(count, 10)
sumElement.textContent = String(prices)

// 列を6行表示する
ROWS_NUMBER.forEach(() => {
    screenWrapper.insertAdjacentHTML('beforeend', rowTemplate())
})

// seatをクリックするとselectedとなる
const rows = document.querySelectorAll('.js-seat')

/**
 * seatの選択状態を切り替える
 * @param {DOMTokenList} classList
 * @return {void}
 */
const toggleSelected = (classList) => {
    classList.contains(SELECTED_SEAT_CLASS)
        ? classList.remove(SELECTED_SEAT_CLASS)
        : classList.add(SELECTED_SEAT_CLASS)
}

rows.forEach((element) => {
    element.addEventListener('click', (event) => {
        if (element.classList.contains('js-seat--occupied')) return
        toggleSelected(element.classList)

        const count = getSelectedSeatsLength()
        const prices = calculateSeatPrices(count, 10)
        selectedCountElement.textContent = String(count)
        sumElement.textContent = String(prices)
    })
})