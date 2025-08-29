import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
}

const QRCodeDisplay = ({ value, size = 256 }: QRCodeDisplayProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 2,
        color: {
          dark: '#1a365d',
          light: '#ffffff'
        }
      });
    }
  }, [value, size]);

  return (
    <Card className="w-fit mx-auto">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-lg">Visitor Entry QR Code</CardTitle>
        <p className="text-sm text-muted-foreground">Scan to register as a visitor</p>
      </CardHeader>
      <CardContent className="flex justify-center">
        <canvas ref={canvasRef} className="border border-border rounded-lg" />
      </CardContent>
    </Card>
  );
};

export default QRCodeDisplay;