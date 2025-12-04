import torch
from ultralytics import YOLO
import warnings
warnings.filterwarnings('ignore')

# Check Model 1
print("=== MODEL 1 (bestcoconutdisease.pt) ===")
try:
    model1 = YOLO('bestcoconutdisease.pt')
    print(f"Task: {model1.task}")
    print(f"Type: {type(model1.model)}")
    print(f"Classes: {model1.names}")
except Exception as e:
    print(f"Error: {e}")

print("\n=== MODEL 2 (best.pt) ===")
try:
    model2 = YOLO('best.pt')
    print(f"Task: {model2.task}")
    print(f"Type: {type(model2.model)}")
    print(f"Classes: {model2.names}")
except Exception as e:
    print(f"Error: {e}")
    # Try loading checkpoint directly
    checkpoint = torch.load('best.pt', map_location='cpu', weights_only=False)
    print(f"Checkpoint keys: {list(checkpoint.keys())}")
    if 'model' in checkpoint:
        print(f"Model type: {type(checkpoint['model'])}")
