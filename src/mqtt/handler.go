package mqtt
import ("encoding/json";"fmt";"log";"time")
type DeviceMessage struct { DeviceID string `json:"device_id"`; Timestamp int64 `json:"timestamp"`; Payload json.RawMessage `json:"payload"`; Topic string `json:"topic"`
type TemperaturePayload struct { Temperature float64 `json:"temperature"`; Humidity float64 `json:"humidity"`; Unit string `json:"unit"`
func HandleMessage(topic string, payload []byte) {
  var msg DeviceMessage
  if err := json.Unmarshal(payload, &msg); err != nil { log.Printf("Error parsing message: %v", err); return }
  switch msg.Topic { case "sensors/temperature": handleTemperature(msg); case "actuators/command": handleCommand(msg); default: log.Printf("Unknown topic: %s", msg.Topic) }
}
func handleTemperature(msg DeviceMessage) {
  var temp TemperaturePayload
  json.Unmarshal(msg.Payload, &temp)
  fmt.Printf("Device %s: Temp=%.1f°C, Humidity=%.1f%%\n", msg.DeviceID, temp.Temperature, temp.Humidity)
}
func handleCommand(msg DeviceMessage) { fmt.Printf("Command received for device %s: %s\n", msg.DeviceID, string(msg.Payload)) }
