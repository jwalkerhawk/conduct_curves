import numpy as np
import matplotlib.pyplot as plt

#
def min_value_normalized(lst):
    return min(lst)


def normalized_current_traces(lst):
    fin_lst = []
    second_fin_lst=[]
    for i in lst:
        fin_lst.append(i/min_value_normalized(lst))
        second_fin_lst.append(i/min_value_normalized(lst)**2)

    return [fin_lst,second_fin_lst]



# x: [int] voltage
# y: [int] boltzmantransformed_data
def  Reversial_potential(voltage,boltz):
    voltage = voltage[5:8]
    boltz = boltz[1][5:8]
    Vertically_stacked_voltages = np.vstack([voltage, np.ones(len(voltage))]).T
    m, b = np.linalg.lstsq(Vertically_stacked_voltages, boltz, rcond=None)[0]
    return abs(b/m)



# rev: int
# volt: [int] voltage
# bolt: [int] boltzmantransformed_data
def conductance_curve(rev, volt, bolt):
    final_lst=[]
    bolt = bolt[1]
    for i in range(len(volt)):
        final_lst.append(bolt[i]/(volt[i] - rev))
    return final_lst



if __name__ == '__main__':
    voltage = [-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100]
    conductance = [-39.71843338,
           -46.24034882,
           -45.60679245,
           -50.57323837,
           -48.50725174,
           -28.71654129,
           32.69388962,
           148.1625519,
           310.9208679,
           501.6563721,
           680.6079712]
    reversial_potential = (Reversial_potential(voltage,normalized_current_traces(conductance)))


    fin = conductance_curve(reversial_potential, voltage, normalized_current_traces(conductance))

    _ = plt.plot(np.array(voltage), fin, '-o', label='Original data', markersize=10)
    _ = plt.xlabel('Voltage (mV)')
    _ = plt.ylabel('Conductance (S)')
    _ = plt.title('Conductance curve of cell 21112046')
    _ = plt.legend()
    plt.show()