conda activate fraud    
python .\api\model\torch_model.py -dp api\data\data_2.csv -cw 0.001
python .\api\model\torch_model.py -dp api\data\data_2.csv -cw 0.005
python .\api\model\torch_model.py -dp api\data\data_2.csv -cw 0.01
python .\api\model\torch_model.py -dp api\data\data_2.csv -cw 0.02
python .\api\model\torch_model.py -dp api\data\data_2.csv -cw 0.05
python .\api\model\torch_model.py -dp api\data\data_2.csv -cw 0.1