import argparse
from pathlib import Path

from data_engineering.src.config import DATA_DIR, EXPORT_DIR
from data_engineering.src.exporter import export_all
from data_engineering.src.generator import main as generate_data
from data_engineering.src.versioning import create_version_manifest


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description='Generate sample or full production datasets for the mood-based food recommendation system.'
    )
    parser.add_argument('--sample', action='store_true', help='Generate a smaller sample dataset for development and testing.')
    parser.add_argument('--full', action='store_true', help='Generate full enterprise-scale datasets.')
    parser.add_argument('--no-export', action='store_true', help='Generate only core CSV datasets without exporting additional formats.')
    parser.add_argument('--no-version', action='store_true', help='Skip version manifest generation.')
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    sample = args.sample or not args.full
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    EXPORT_DIR.mkdir(parents=True, exist_ok=True)

    print('Starting dataset generation...')
    generate_data(sample=sample)
    print(f'Primary dataset files written to: {DATA_DIR}')

    if not args.no_export:
        print('Exporting datasets to additional formats...')
        export_all(DATA_DIR, EXPORT_DIR)
        print(f'Exports generated to: {EXPORT_DIR}')

    if not args.no_version:
        print('Creating dataset version manifest...')
        create_version_manifest(DATA_DIR, EXPORT_DIR)
        print('Version manifest created.')

    print('Dataset generation completed successfully.')


if __name__ == '__main__':
    main()
