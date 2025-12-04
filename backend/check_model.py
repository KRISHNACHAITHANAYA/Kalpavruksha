import torch
import warnings
warnings.filterwarnings('ignore')

# Load with weights_only=False (trusted source)
checkpoint = torch.load('C:/Users/nbyas/Downloads/coconut-guardian/backend/best.pt', 
                       map_location='cpu', 
                       weights_only=False)

# Print the class names from the checkpoint
if 'names' in checkpoint:
    print("Model class names:", checkpoint['names'])
    print("\nNumber of classes:", len(checkpoint['names']))
elif 'model' in checkpoint and hasattr(checkpoint['model'], 'names'):
    print("Model class names:", checkpoint['model'].names)
    print("\nNumber of classes:", len(checkpoint['model'].names))
else:
    print("Available keys in checkpoint:", list(checkpoint.keys()))
