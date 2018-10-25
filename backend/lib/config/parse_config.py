import yaml.scanner
import os

relative_config_path = "config.yml"

absolute_directory_path = os.path.dirname(os.path.abspath(__file__))
absolute_config_path = os.path.join(absolute_directory_path, relative_config_path)

config = dict()

try:
    with open(absolute_config_path, "r") as f:
        try:
            config = yaml.safe_load(f) or {}
        except yaml.scanner.ScannerError as e:
            raise Exception(f"Configuration file at '{absolute_config_path}' contains invalid YAML...")
        except Exception as e:
            print(type(e))
except FileNotFoundError as e:
    raise Exception(f"Configuration file not found at: '{absolute_config_path}'...")
