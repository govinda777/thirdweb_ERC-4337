#!/bin/bash

# Default RPC URL if environment variable is not set
DEFAULT_RPC_URL="https://polygon-amoy-bor-rpc.publicnode.com"

# Use environment variable if available, otherwise use default
RPC_URL=${NEXT_PUBLIC_THIRDWEB_RPC_URL:-$DEFAULT_RPC_URL}

echo "-------------------------------------"
echo "Network Connectivity Check"
echo "-------------------------------------"

# 1. Check general internet connectivity (optional, but helpful)
echo "[1/2] Checking general internet connectivity (pinging 1.1.1.1)..."
ping -c 1 1.1.1.1 > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "  ✅ Success: Able to ping 1.1.1.1."
else
  echo "  ❌ Failure: Unable to ping 1.1.1.1. Check your internet connection."
  # Optionally exit here if general internet is down
  # exit 1
fi

# 2. Check connection to the RPC endpoint
echo "\n[2/2] Checking RPC endpoint: $RPC_URL"

# Use curl to send a basic JSON-RPC request (eth_chainId)
# -s: silent mode
# -X POST: specify POST request
# -H "Content-Type: application/json": set header
# --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}': send payload
# --connect-timeout 10: timeout after 10 seconds for connection
# -o /dev/null: discard the output body
# -w '%{http_code}': print only the HTTP status code
HTTP_STATUS=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}' \
  --connect-timeout 10 \
  -o /dev/null \
  -w '%{http_code}' \
  "$RPC_URL")

CURL_EXIT_CODE=$?

echo "  Curl exit code: $CURL_EXIT_CODE"
echo "  HTTP status code: $HTTP_STATUS"

if [ $CURL_EXIT_CODE -eq 0 ] && [ "$HTTP_STATUS" -eq 200 ]; then
  echo "  ✅ Success: Successfully connected to RPC endpoint and received HTTP 200."
  echo "     (This indicates the endpoint is reachable and responding to basic requests)"
elif [ $CURL_EXIT_CODE -ne 0 ]; then
  echo "  ❌ Failure: curl command failed (Exit Code: $CURL_EXIT_CODE)."
  echo "     Check the RPC URL and your network connection/firewall."
  echo "     Common curl exit codes:"
  echo "       6: Couldn't resolve host"
  echo "       7: Failed to connect to host"
  echo "      28: Operation timeout"
echo "     See 'man curl' for more exit codes."
else
  echo "  ❌ Failure: Connected to RPC endpoint but received non-200 HTTP status ($HTTP_STATUS)."
  echo "     The endpoint is reachable, but may be down, rate-limiting, or require authentication."
fi

echo "\n-------------------------------------"
echo "Check complete." 