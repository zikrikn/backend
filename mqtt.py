import paho.mqtt.client as mqtt
import time

# MQTT broker settings
broker_address = "172.21.160.1"  # Replace with your RabbitMQ broker address
port = 1883  # Default MQTT port
topic = "test"  # Replace with the MQTT topic you want to publish/subscribe to

# Callbacks
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT broker")
        client.subscribe(topic)
    else:
        print("Connection failed")

def on_message(client, userdata, message):
    print(f"Received message '{message.payload.decode()}' on topic '{message.topic}'")

# Create an MQTT client
client = mqtt.Client()

# Set callback functions
client.on_connect = on_connect
client.on_message = on_message

# Connect to the MQTT broker
client.connect(broker_address, port, 60)

# Start the MQTT client loop (non-blocking)
client.loop_start()

# Publish a test message (optional)
while True:
    message = input("Enter a message to publish (or press Enter to quit): ")
    if not message:
        break
    client.publish(topic, message)

# Keep the script running
while True:
    time.sleep(1)
