import { defaultClient, setup, TelemetryClient } from 'applicationinsights';

setup().start();
export const telemetryClient = defaultClient;
