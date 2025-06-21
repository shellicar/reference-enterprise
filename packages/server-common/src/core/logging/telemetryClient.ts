import { TelemetryClient, defaultClient, setup } from 'applicationinsights';

setup().start();
export const telemetryClient = defaultClient;
