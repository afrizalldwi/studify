"use client"

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { useCalendarStore } from "../store/calendar-store"
import { useCallback, useMemo, useRef, useImperativeHandle, forwardRef, useEffect } from "react"
import type { EventClickArg, EventContentArg, DateSelectArg, CalendarApi, DatesSetArg, EventDropArg } from "@fullcalendar/core"
import { EventItem } from "./event-item"
import { calendarEventsApi } from "@/lib/api/calendar-events"

const viewToFc: Record<string, string> = {
  month: "dayGridMonth",
  week: "timeGridWeek",
  day: "timeGridDay",
}

const fcToView: Record<string, string> = {
  dayGridMonth: "month",
  timeGridWeek: "week",
  timeGridDay: "day",
}

interface FullCalendarComponentProps {
  onDatesSet: (dateInfo: { viewTitle: string; date: Date }) => void
  onEventClick: (clickInfo: EventClickArg) => void
  onDateSelect: (selectInfo: DateSelectArg) => void
}

export interface FullCalendarRef {
  getApi: () => CalendarApi | null
}

export const FullCalendarComponent = forwardRef<
  FullCalendarRef,
  FullCalendarComponentProps
>(({ onDatesSet, onEventClick, onDateSelect }, ref) => {
  const calendarRef = useRef<FullCalendar>(null)
  const { events, currentView, selectedDate, setView } = useCalendarStore()

  useImperativeHandle(ref, () => ({
    getApi: () => calendarRef.current ? calendarRef.current.getApi() : null,
  }))

  const handleDateSelect = useCallback(
    (selectInfo: DateSelectArg) => {
      const calendarApi = selectInfo.view.calendar
      calendarApi.unselect() // clear date selection
      onDateSelect(selectInfo)
    },
    [onDateSelect],
  )

  const handleEventClick = useCallback(
    (clickInfo: EventClickArg) => {
      onEventClick(clickInfo)
    },
    [onEventClick],
  )

  const handleEventDrop = useCallback(
    (info: EventDropArg) => {
      const eventId = info.event.id
      const newStartDate = info.event.startStr
      const newEndDate = info.event.endStr || info.event.startStr

      const oldStart = info.oldEvent.startStr
      const oldEnd = info.oldEvent.endStr || info.oldEvent.startStr

      const store = useCalendarStore.getState()
      const oldEvent = store.events.find((e) => e.id === eventId)
      if (!oldEvent) return

      // Optimistically update store (Zustand setState triggers re-render)
      useCalendarStore.setState((state) => ({
        events: state.events.map((e) =>
          e.id === eventId
            ? { ...e, startDate: newStartDate, endDate: newEndDate }
            : e
        ),
      }))

      calendarEventsApi
        .update(eventId, { startDate: newStartDate, endDate: newEndDate })
        .catch(() => {
          // Rollback on failure
          useCalendarStore.setState((state) => ({
            events: state.events.map((e) =>
              e.id === eventId
                ? { ...e, startDate: oldStart, endDate: oldEnd }
                : e
            ),
          }))
        })
    },
    [],
  )

  const calendarEvents = useMemo(() => {
    return events.map((event) => ({
      id: event.id,
      title: event.title,
      start: event.startDate,
      end: event.endDate,
      extendedProps: {
        category: event.category,
        priority: event.priority,
        completed: event.completed,
      },
      classNames: [
        `fc-event-${event.category.toLowerCase().replace(/\s/g, "-")}`,
      ],
    }))
  }, [events])

  // Sync store view → FullCalendar
  useEffect(() => {
    const api = calendarRef.current?.getApi()
    if (!api) return
    const fcView = viewToFc[currentView]
    if (fcView && api.view.type !== fcView) {
      api.changeView(fcView)
    }
  }, [currentView])

  const renderEventContent = useCallback((eventInfo: EventContentArg) => {
    return <EventItem event={eventInfo.event} />
  }, [])

  const handleDatesSet = useCallback((dateInfo: DatesSetArg) => {
    const viewName = fcToView[dateInfo.view.type]
    if (viewName) {
      setView(viewName)
    }
    onDatesSet({
      viewTitle: dateInfo.view.title,
      date: dateInfo.view.calendar.getDate(),
    })
  }, [onDatesSet, setView])

  return (
    <div className="calendar-container">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView={viewToFc[currentView] || "dayGridMonth"}
        initialDate={selectedDate}
        events={calendarEvents}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        eventDrop={handleEventDrop}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        datesSet={handleDatesSet}
        height="auto"
        views={{
          dayGrid: {
            dayMaxEventRows: 4,
          },
          timeGrid: {
            slotMinTime: "06:00:00",
            slotMaxTime: "22:00:00",
          },
        }}
      />
    </div>
  )
})

FullCalendarComponent.displayName = "FullCalendarComponent"
