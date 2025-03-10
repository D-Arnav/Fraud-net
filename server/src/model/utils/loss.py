import torch
import torch.nn as nn
import torch.nn.functional as F



class FocalLoss(nn.Module):
    def __init__(self, alpha=0.25, gamma=2, reduction='mean'):
        """
        Focal Loss for binary or multi-class classification.
        
        Parameters:
        alpha (float or list): Balancing factor to weigh the class contributions (default 0.25).
        gamma (float): Focusing parameter to control the down-weighting of easy examples (default 2).
        reduction (str): Specifies the reduction to apply to the output: 'none' | 'mean' | 'sum' (default 'mean').
        """

        super(FocalLoss, self).__init__()
        self.alpha = alpha
        self.gamma = gamma
        self.reduction = reduction


    def forward(self, inputs, targets):
        """
        Forward pass for the focal loss.
        
        Parameters:
        inputs (tensor): Predicted probabilities (logits), shape [batch_size, num_classes].
        targets (tensor): True labels, shape [batch_size] or [batch_size, num_classes] for multi-class.
        
        Returns:
        Tensor: Computed focal loss.
        """

        inputs = inputs.float()
        prob = F.softmax(inputs, dim=1)
        
        if targets.dim() == 1:
            targets = F.one_hot(targets, num_classes=inputs.size(1)).float()

        cross_entropy = F.cross_entropy(prob, targets, weight=torch.tensor([self.alpha, 1-self.alpha]))
                                                            
        loss = self.alpha * (1 - prob) ** self.gamma * cross_entropy
        
        if self.reduction == 'mean':
            return loss.mean()
        elif self.reduction == 'sum':
            return loss.sum()
        elif self.reduction == 'none':
            return loss
        else:
            raise ValueError(f"Invalid reduction type: {self.reduction}")