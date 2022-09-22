#!/usr/bin/env bash

# Define queues in the array below that needs to be declared when RabbitMQ starts up
queues=("post_action_create.queue" "post_action_update.queue")

# Define exchanges in the array below that needs to be declared when RabbitMQ starts up
exchanges=("post_action.exchange")

# Define bindings in format queue:exchange in the array below that needs to be declared when RabbitMQ starts up
bindings=("post_action_create.queue:post_action.exchange" "post_action_update.queue:post_action.exchange")

for i in "${queues[@]}"
do
command="rabbitmqadmin declare queue name=$i durable=true"
output=$(eval $command)
echo $output
done

for i in "${exchanges[@]}"
do
command="rabbitmqadmin declare exchange name=$i type=fanout"
output=$(eval $command)
echo $output
done

for binding in "${bindings[@]}"; do
string=(${binding//":"/ })
queue=${string[0]}
exchange=${string[1]}
command="rabbitmqadmin declare binding source="$exchange" destination_type="queue" destination="$queue""
output=$(eval $command)
echo $output
done
