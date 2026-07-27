import argparse
from pathlib import Path

from data_engineering.src.validator import validate_all
from data_engineering.src.config import DATA_DIR


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description='Validate generated mood food recommendation datasets.')
    parser.add_argument('--data-dir', type=Path, default=DATA_DIR, help='Path to the dataset directory.')
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    print(f'Validating datasets in {args.data_dir}')
    results = validate_all(args.data_dir)
    print('Validation summary:')
    for dataset_name, summary in results.items():
        status = 'PASSED' if summary['valid'] else 'FAILED'
        print(f' - {dataset_name}: {status} ({summary["checked"]} records checked, {summary["errors"]} errors)')
    invalid = [name for name, summary in results.items() if not summary['valid']]
    if invalid:
        raise SystemExit(f"Validation failed for: {', '.join(invalid)}")
    print('All datasets validated successfully.')


if __name__ == '__main__':
    main()
