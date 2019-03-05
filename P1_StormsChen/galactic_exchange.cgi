#!/usr/bin/python3

# Authors: William Storms, Jia-Yi Chen
# Date: 02.11.19

print("Content-type: text/html")
print()

import cgi
import random
import cgitb

# Exchange rate dictionary
usdollar_exchange_rates = {
  "euro": .88,
  "xarn": 26.2,
  "icekrona": 119.88,
  "polandzloty": 3.76,
  "galacticrock": 0.123456,
  "usdollar": 1.0
}

# Commodities dictionary
commodity_value_ranges = {
  "terrangold": [1100, 1800],
  "terransilver": [13, 18],
  "terrancopper": [2, 4],
  "xarngold": [1900, 2800],
  "xarnsilver": [113,158],
  "xarncopper": [.1,.2],
  "xarnsugar": [191.01, 2000],
  "corn": [338.25, 40.00],
  "wheat": [438.50, 600.40],
  "coffee": [101.01, 100000]
}

def convert(quantity, original, preferred):
    # Converts a specified quantity from original currency to preferred currency

    # If original currency is USD, simply look in the dictionary for the conversion rate and multiply
    if (original == "usdollar"):
        return quantity * usdollar_exchange_rates[preferred]
    # If original currency is not USD, first convert to  USD,
    # then convert to the preferred currency using "usdollar as original
    else:
        dollars = quantity / usdollar_exchange_rates[original]
        return convert(dollars, "usdollar", preferred)

def lookup(commodity):
    # Look up function to determine current value of commodities
    commodity_ranges = commodity_value_ranges[commodity]
    return simulate(commodity_ranges[0],commodity_ranges[1])

def simulate(lower, upper):
    # Simulate function to determine random value of commodities given range from dictionary
    return random.uniform(lower,upper)


cgitb.enable() # Enables debugging tool for cgi
form = cgi.FieldStorage() # Obtains inputted fields from html forms

def no_input_error():
    # Function to output display if no input is given
    print("<html>")
    print(" <body>")
    print("     <style>")
    print("         table, th, td {")
    print("             border: 1px solid black;")
    print("         }")
    print("     </style>")
    print("     <table border = '.5'>")
    print("         <tr>")
    print("             <th>IN</th>")
    print("             <th>OUT</th>")
    print("             <th>QUANTITY</th>")
    print("             <th></th>")
    print("             <th>ERROR</th>")
    print("         </tr>")
    print("         <tr><br>")
    print("             <td></td>")
    print("             <td></td>")
    print("             <td></td>")
    print("             <td></td>")
    print("             <td>nothing submitted, nothing returned</td>")
    print("         </tr>")
    print("     </table>")
    print(" </body>")
    print("</html>")

# If "convert_button" is sent from form, a conversion was initiated
if "convert_button" in form:
    # Initilize all debug booleans to false
    error = False
    incurrency_error = False
    outcurrency_error = False
    amount_error = False
    incurrency_blank = False
    outcurrency_blank = False
    amount_blank = False
    all_blank = False

    # Normalize input to check and see if "incurrency" is blank or not of accepted currencies
    incurrency = str(form.getfirst("incurrency")).lower()
    if incurrency == "none":
        incurrency_blank = True
    else:
        if incurrency not in usdollar_exchange_rates:
            incurrency_error = True

    # Error checking for "outcurrency"
    outcurrency = str(form.getfirst("outcurrency")).lower()
    if outcurrency == "none":
        outcurrency_blank = True
    else:
        if outcurrency not in usdollar_exchange_rates:
            outcurrency_error = True

    # Error checking for "amount"
    amount = str(form.getfirst("amount"))
    if amount == "None":
        amount_blank = True
    else:
        try:
            amount = float(amount)
        except ValueError:
            amount_error = True

    # If there are any errors, set error flag to true
    if (incurrency_error or outcurrency_error or amount_error):
        error = True

    # If there all fields are blanks, set blank flag to true
    if (incurrency_blank and outcurrency_blank and amount_blank):
        all_blank = True

    # If there are any blanks, set error flag to true
    if (incurrency_blank or outcurrency_blank or amount_blank):
        error = True

    # If all fields are blank, print "no input" page
    if (all_blank):
        no_input_error()

    else: # Print result pages

        # Get value for conversion button if selected
        converted = form.getvalue("convert_button")
        if (not error): # Only calculate result if there is no error
            result = convert(amount, incurrency, outcurrency)

        # Initial output html
        print("<html>")
        print("<body>")
        print(" <style>")
        print("     table, th, td {")
        print("         border: 1px solid black;")
        print("     }")
        print(" </style>")
        print(" <table border = '.5'>")
        print("     <tr>")
        print("         <th>IN</th>")
        print("         <th>OUT</th>")
        print("         <th>QUANTITY</th>")
        print("         <th></th>")
        print("         <th>ANSWER</th>")
        print("     </tr>")
        print("     <tr><br>")

        # If incurrency is missing or invalid, adjust text and color
        if (not incurrency_blank):
            if (not incurrency_error):
                print(" <td>", incurrency, "</td>")
            else:
                print(" <td><font color='blue'>", incurrency, "</font></td>")
        else:
            print(" <td><font color='red'> missing </font></td>")

        # If outcurrency is missing or invalid, adjust text and color
        if (not outcurrency_blank):
            if (not outcurrency_error):
                print(" <td>", outcurrency, "</td>")
            else:
                print(" <td><font color='blue'>", outcurrency, "</font></td>")
        else:
            print(" <td><font color='red'> missing </font></td>")

        # If amount is missing or invalid, adjust text and color
        if (not amount_blank):
            if (not amount_error):
                print(" <td>", amount, "</td>")
            else:
                print(" <td><font color='green'>", amount, "</font></td>")
        else:
            print(" <td><font color='red'> missing </font></td>")

        print(" <td></td>")

        # If there was an error, report result
        if (not error):
            print(" <td>", result, "</td>")
        elif (not (amount_blank or amount_error)):
            print(" <td> unknown choice </td>")
        else:
            print(" <td> invalid amount </td>")

        print("     </tr>")
        print(" </table>")
        print("</body>")
        print("</html>")

# Else, lookup button was sent from form, initiating a commodity lookup
else:

    # Error checking for "commodity"
    commodity = str(form.getfirst("commodity")).lower()
    commodity_error = False
    commodity_blank = False
    if commodity == "none":
        commodity_blank = True
        commodity_error = True
    else:
        if commodity in commodity_value_ranges:
            lookup_value = lookup(commodity)
        else:
            commodity_error = True

    # Initial output html
    print("<html>")
    print("<body>")
    print(" <style>")
    print("     table, th, td {")
    print("         border: 1px solid black;")
    print("     }")
    print(" </style>")
    print(" <table border = '.5'>")
    print("     <tr>")
    print("         <th>COMMODITY</th>")
    print("         <th></th>")
    print("         <th>ANSWER</th>")
    print("     </tr>")
    print(" <tr><br>")

    # If commodity is missing or invalid, adjust text and color
    if (not commodity_blank):
        if (not commodity_error):
            print(" <td>", commodity, "</td>")
        else:
            print(" <td><font color='blue'>", commodity, "</font></td>")
    else:
        print(" <td><font color='red'> missing </font></td>")

    print(" <td></td>")

    # If there was an error, report result
    if (not (commodity_error or commodity_blank)):
        print(" <td>", lookup_value, "</td>")
    else:
        print(" <td> unknown choice </td>")

    print("     </tr>")
    print(" </table>")
    print("</body>")
    print("</html>")

