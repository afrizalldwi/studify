"use client"

import { useEffect, useState, useRef } from "react"

import type { EventClickArg, DateSelectArg } from "@fullcalendar/core"

import { useCalendarStore } from "@/features/calendar/store/calendar-store"
import { CalendarHeader } from "@/features/calendar/components/calendar-header"
import { CalendarNavigation } from "@/features/calendar/components/calendar-navigation"
import { CalendarSearchFilter } from "@/features/calendar/components/calendar-search-filter"
import { EventModal } from "@/features/calendar/components/event-modal"
import { EventDetailPanel } from "@/features/calendar/components/event-detail-panel"
import { AgendaItem } from "@/features/calendar/components/agenda-item"
import { UpcomingEventCard } from "@/features/calendar/components/upcoming-event-card"
import { ScheduleSummary } from "@/features/calendar/components/schedule-summary"
import { CalendarSkeleton } from "@/features/calendar/components/calendar-skeleton"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, ListTodo } from "lucide-react"
import { FullCalendarComponent, FullCalendarRef } from "@/features/calendar/components/full-calendar"

export default function CalendarPage() {
  const calendarRef = useRef<FullCalendarRef>(null)
  const [loading, setLoading] = useState(true)
  const [calendarTitle, setCalendarTitle] = useState("")

  const {
    events,
    selectedEvent,
    selectEvent,
    openModal,
    filteredEvents,
    fetchEvents,
  } = useCalendarStore()

  useEffect(() => {
    // Fetch events when the component mounts
    fetchEvents()
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [fetchEvents]) // Add fetchEvents to the dependency array

  const filtered = filteredEvents()

  const handleEventClick = (clickArg: EventClickArg) => {
    const event = events.find((e) => e.id === clickArg.event.id)
    if (event) selectEvent(event)
  }

  const handleDateSelect = () => {
    openModal("create")
  }

  const handleDatesSet = (dateInfo: { viewTitle: string; date: Date }) => {
    setCalendarTitle(dateInfo.viewTitle)
  }

  const handlePrev = () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      calendarApi.prev()
    }
  }

  const handleNext = () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      calendarApi.next()
    }
  }

  const handleToday = () => {
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      calendarApi.today()
    }
  }

  const today = new Date().toDateString()
  const todayEvents = filtered.filter(
    (e) => new Date(e.startDate).toDateString() === today,
  )

  const upcoming = filtered
    .filter((e) => new Date(e.startDate) > new Date() && !e.completed)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 5)

  if (loading) {
    return <CalendarSkeleton />
  }

  return (
    <div className="space-y-6">
      <CalendarHeader />

      <CalendarSearchFilter />

      <Separator />

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-4 min-w-0">
          <CalendarNavigation
            onPrev={handlePrev}
            onNext={handleNext}
            onToday={handleToday}
            title={calendarTitle}
          />

          <div className="calendar-wrapper">
            <FullCalendarComponent
              ref={calendarRef}
              onDatesSet={handleDatesSet}
              onEventClick={handleEventClick}
              onDateSelect={handleDateSelect}
            />
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            Today&apos;s Agenda
          </div>

          {todayEvents.length === 0 ? (
            <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
              No events scheduled for today
            </div>
          ) : (
            <div className="space-y-2">
              {todayEvents.map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => selectEvent(event)}
                  className="w-full text-left"
                >
                  <AgendaItem event={event} />
                </button>
              ))}
            </div>
          )}

          <Separator />

          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <ListTodo className="h-4 w-4" />
            Upcoming Schedule
          </div>

          {upcoming.length === 0 ? (
            <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
              No upcoming events
            </div>
          ) : (
            <div className="space-y-2">
              {upcoming.map((event) => (
                <UpcomingEventCard
                  key={event.id}
                  event={event}
                  onClick={() => selectEvent(event)}
                />
              ))}
            </div>
          )}

          <Separator />

          {selectedEvent && <EventDetailPanel />}

          <ScheduleSummary />
        </div>
      </div>

      <EventModal />
    </div>
  )
}

