interface NotificationProps {
  message: string
}

export const Notification = (props: NotificationProps) => {
  return (
    <>
      {props.message && <p style={{ color: 'red' }}>{props.message}</p>}
    </>
  )
}