import sys
import json
import pprint

class SpecialEncoder(json.JSONEncoder):
    def default(self, o):
        import decimal
        import datetime
        if isinstance(o, decimal.Decimal):
            return float(o)
        if isinstance(o, datetime.date):
            return o.isoformat()
        return super(DecimalEncoder, self).default(o)

def convertBalance(balance):
    result = {}
    result['amount'] = balance.amount.amount
    result['currency'] = balance.amount.currency
    result['date'] = balance.date
    result['status'] = balance.status
    return result

def main(argv):
    import mt940
    import os
    if len(argv) < 2:
        sys.stderr.write("Usage: %s <mt940 file> <json file>" % (argv[0],))
        return 1

    transactions_file = argv[1]
    if not os.path.exists(transactions_file):
        sys.stderr.write("ERROR: File %r was not found!" % (transactions_file,))
        return 1

    transactions = mt940.parse(transactions_file)
    sys.stderr.write("Found %d transactions, exporting to JSON\n" % (len(transactions),))

    result = []
    for trans in transactions:
        record = {}
        record['id'] = trans.data['id']
        record['amount'] = {}
        record['amount']['amount'] = trans.data['amount'].amount
        record['amount']['currency'] = trans.data['amount'].currency
        record['currency'] = trans.data['currency']
        record['date'] = trans.data['date']
        record['entryDate'] = trans.data['entry_date']
        record['fundsCode'] = trans.data['funds_code']
        record['status'] = trans.data['status']
        if 'transaction_reference' in trans.data:
            record['reference'] = trans.data['transaction_reference']
        record['details'] = trans.data['transaction_details']
        record['extraDetails'] = trans.data['extra_details']
        result.append(record)

    json_file = argv[2]
    resultWrap = {}
    resultWrap['accountIdentification'] = transactions.data['account_identification']
    resultWrap['finalOpeningBalance'] = convertBalance(transactions.data['final_opening_balance'])
    resultWrap['finalClosingBalance'] = convertBalance(transactions.data['final_opening_balance'])
    resultWrap['transactions'] = result
    with open(json_file, 'w') as output:
        for chunk in SpecialEncoder().iterencode(resultWrap):
            output.write(chunk)


if __name__ == "__main__":
    sys.exit(main(sys.argv))
