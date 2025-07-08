import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  userId?: number;
  relatedId?: number; // ID relacionado (cita, tratamiento, etc.)
  relatedType?: 'appointment' | 'treatment' | 'medication' | 'alert';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications$ = new BehaviorSubject<Notification[]>([]);
  private notificationCounter = 1;

  constructor() {
    this.loadInitialNotifications();
  }

  // Obtener todas las notificaciones
  getNotifications(): Observable<Notification[]> {
    return this.notifications$.asObservable();
  }

  // Obtener notificaciones no leídas
  getUnreadNotifications(): Observable<Notification[]> {
    return new Observable(observer => {
      this.notifications$.subscribe(notifications => {
        observer.next(notifications.filter(n => !n.read));
      });
    });
  }

  // Obtener cantidad de notificaciones no leídas
  getUnreadCount(): Observable<number> {
    return new Observable(observer => {
      this.notifications$.subscribe(notifications => {
        observer.next(notifications.filter(n => !n.read).length);
      });
    });
  }

  // Agregar nueva notificación
  addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): void {
    const newNotification: Notification = {
      ...notification,
      id: this.notificationCounter++,
      timestamp: new Date(),
      read: false
    };

    const currentNotifications = this.notifications$.value;
    this.notifications$.next([newNotification, ...currentNotifications]);
  }

  // Marcar notificación como leída
  markAsRead(notificationId: number): void {
    const notifications = this.notifications$.value.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    );
    this.notifications$.next(notifications);
  }

  // Marcar todas como leídas
  markAllAsRead(): void {
    const notifications = this.notifications$.value.map(notification => ({
      ...notification,
      read: true
    }));
    this.notifications$.next(notifications);
  }

  // Eliminar notificación
  removeNotification(notificationId: number): void {
    const notifications = this.notifications$.value.filter(
      notification => notification.id !== notificationId
    );
    this.notifications$.next(notifications);
  }

  // Limpiar todas las notificaciones
  clearAll(): void {
    this.notifications$.next([]);
  }

  // Notificaciones específicas para diferentes eventos
  notifyAppointmentScheduled(patientName: string, doctorName: string, date: string, time: string): void {
    this.addNotification({
      title: 'Cita Programada',
      message: `Nueva cita programada con ${doctorName} el ${date} a las ${time}`,
      type: 'success',
      relatedType: 'appointment'
    });
  }

  notifyAppointmentReminder(doctorName: string, date: string, time: string): void {
    this.addNotification({
      title: 'Recordatorio de Cita',
      message: `Tienes una cita con ${doctorName} mañana a las ${time}`,
      type: 'info',
      relatedType: 'appointment'
    });
  }

  notifyMedicationReminder(medicationName: string): void {
    this.addNotification({
      title: 'Recordatorio de Medicamento',
      message: `Es hora de tomar tu medicamento: ${medicationName}`,
      type: 'warning',
      relatedType: 'medication'
    });
  }

  notifyTreatmentUpdate(treatmentName: string): void {
    this.addNotification({
      title: 'Actualización de Tratamiento',
      message: `Tu tratamiento "${treatmentName}" ha sido actualizado`,
      type: 'info',
      relatedType: 'treatment'
    });
  }

  notifyAbnormalValues(testName: string): void {
    this.addNotification({
      title: 'Valores Anómalos Detectados',
      message: `Se han detectado valores fuera del rango normal en: ${testName}`,
      type: 'error',
      relatedType: 'alert'
    });
  }

  notifyAppointmentCancelled(doctorName: string, date: string): void {
    this.addNotification({
      title: 'Cita Cancelada',
      message: `Tu cita con ${doctorName} del ${date} ha sido cancelada`,
      type: 'warning',
      relatedType: 'appointment'
    });
  }

  // Cargar notificaciones iniciales (simuladas)
  private loadInitialNotifications(): void {
    const initialNotifications: Notification[] = [
      {
        id: this.notificationCounter++,
        title: 'Bienvenido a OnContigo',
        message: 'Tu cuenta ha sido creada exitosamente',
        type: 'success',
        timestamp: new Date(Date.now() - 86400000), // Ayer
        read: true,
        relatedType: 'info'
      },
      {
        id: this.notificationCounter++,
        title: 'Recordatorio de Cita',
        message: 'Tienes una cita mañana con Dr. García a las 10:30',
        type: 'info',
        timestamp: new Date(Date.now() - 3600000), // Hace 1 hora
        read: false,
        relatedType: 'appointment'
      },
      {
        id: this.notificationCounter++,
        title: 'Medicamento Pendiente',
        message: 'No olvides tomar tu medicamento de las 14:00',
        type: 'warning',
        timestamp: new Date(Date.now() - 1800000), // Hace 30 minutos
        read: false,
        relatedType: 'medication'
      }
    ];

    this.notifications$.next(initialNotifications);
  }

  // Simular notificaciones en tiempo real (para demostración)
  simulateRealTimeNotifications(): void {
    setInterval(() => {
      const randomNotifications = [
        {
          title: 'Recordatorio de Medicamento',
          message: 'Es hora de tomar tu Paracetamol',
          type: 'warning' as const,
          relatedType: 'medication' as const
        },
        {
          title: 'Resultado de Examen',
          message: 'Los resultados de tu análisis están listos',
          type: 'info' as const,
          relatedType: 'alert' as const
        },
        {
          title: 'Cita Confirmada',
          message: 'Tu cita para la próxima semana ha sido confirmada',
          type: 'success' as const,
          relatedType: 'appointment' as const
        }
      ];

      const randomIndex = Math.floor(Math.random() * randomNotifications.length);
      const notification = randomNotifications[randomIndex];

      // Solo agregar notificación aleatoria ocasionalmente (20% de probabilidad)
      if (Math.random() < 0.2) {
        this.addNotification(notification);
      }
    }, 30000); // Cada 30 segundos
  }
}
