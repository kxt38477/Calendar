import React, { useEffect, useState } from 'react'
import './Calendar.css'

const Calendar = () => {
    // 設置現在日期
    const [nowDate, setNowDate] = useState(new Date())
    const [monthTotalDate, setMonthTotalDate] = useState([]) //該月總天數
    const [prevMonthDate, setPrevMonthDate] = useState([])//上個月的日期
    const [nextMonthDate, setNextMonthDate] = useState([])//下個月的日期

    const [startDate, setStartDate] = useState(null) // 起始日期
    const [endDate, setEndDate] = useState(null) // 結束日期

    useEffect(() => {
        const year = nowDate.getFullYear()
        const month = nowDate.getMonth()
        //上個月
        const prevMonthLastDate = new Date(year, month, 0);
        const prevMonthDate_Arr = []
        //當月 Date日期  Day星期
        const monthFirstDate = new Date(year, month, 1)
        const DaysInMonth = new Date(year, month + 1, 0).getDate() //用最後一天取得該月總天數
        const Date_Arr = []
        // 下個月
        const nextMonthFirstDate = new Date(year, month + 1, 1)
        const nextMonthFirstDay = new Date(year, month + 1, 1).getDay();
        const nextMonthDate_Arr = []

        //先塞前個月的空餘天數，再塞當月天數
        for (let i = 0; i < monthFirstDate.getDay(); i++) {
            prevMonthDate_Arr.unshift(new Date(prevMonthLastDate))
            prevMonthLastDate.setDate(prevMonthLastDate.getDate() - 1)
        }
        setPrevMonthDate(prevMonthDate_Arr)
        // 製作當天月數
        for (let i = 0; i < DaysInMonth; i++) {
            Date_Arr.push(new Date(monthFirstDate))
            monthFirstDate.setDate(monthFirstDate.getDate() + 1);
        }
        setMonthTotalDate(Date_Arr);
        // 製作下個月天數
        if (nextMonthFirstDay !== 0) {
            for (let i = 0; i < 7 - nextMonthFirstDay; i++) {
                nextMonthDate_Arr.push(new Date(nextMonthFirstDate))
                nextMonthFirstDate.setDate(nextMonthFirstDate.getDate() + 1)
            }
        }
        setNextMonthDate(nextMonthDate_Arr)
    }, [nowDate])

    const daysName = ['日', '一', '二', '三', '四', '五', '六']

    const previousMonth = () => {
        setNowDate(new Date(nowDate.setMonth(nowDate.getMonth() - 1)))
    }
    const nextMonth = () => {
        setNowDate(new Date(nowDate.setMonth(nowDate.getMonth() + 1)))
    }
    const handleDateClick = (date) => {
        if ((!startDate || date < startDate) || endDate) {
            // 重置選擇範圍
            setStartDate(date);
            setEndDate(null);

        } else if (!endDate && date >= startDate) {
            setEndDate(date);
        }
    }
    const inSelectRange = (day) => { //該日在範圍內就返回true，反之false
        return startDate && endDate && day >= startDate && day <= endDate;
    }

    
    return (
        <div className='calendar'>
            <div className='header'>
                <button className='monthSelect' onClick={previousMonth}>&lt;</button>
                <span className='dateTitle'>{nowDate.getFullYear() + '年' + (nowDate.getMonth() + 1) + '月'}</span>
                <button className='monthSelect' onClick={nextMonth}>&gt;</button>
            </div>
            <div className='days' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                {
                    daysName.map(day => (
                        <div key={day} className='day' style={{ width: '14.28%', textAlign: 'center' }}>
                            {day}
                        </div>
                    ))
                }
            </div>
            <div className='total_date'>
                {
                    prevMonthDate.map((value, index) => (
                        <div key={index} className="empty">{value.getDate() + '日'}</div>
                    ))
                }
                {
                    monthTotalDate.map((day, index) => (
                        <div key={day} className={`date${day.getDate() === new Date().getDate() && day.getMonth() === new Date().getMonth() ? ' today' : ''}
                        ${startDate && day.toDateString() === startDate.toDateString() ? ' active' : ''}
                        ${endDate && day.toDateString() === endDate.toDateString() ? ' active' : ''}
                        ${inSelectRange(day) ? ' active' : ''}`}
                            onClick={() => handleDateClick(day)}>{day.getDate() + '日'}</div>
                    ))
                }
                {
                    nextMonthDate.map((value, index) => (
                        <div key={index} className="empty">{value.getDate() + '日'}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default Calendar