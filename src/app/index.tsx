import { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Declaration = {
  id: number;
  area: string;
  departement: string;
  description: string;
  equipement: string;
  reason: string;
  date: string;
  start: string;
  end: string;
  targetHours: number;
};

// بما أنك كتجربي من المتصفح فـ نفس PC ديال الـBackend
const API_URL = 'http://localhost:3000';

export default function HomeScreen() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const [showStartModal, setShowStartModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

  const [selectedHour, setSelectedHour] = useState('00');
  const [selectedMinute, setSelectedMinute] = useState('00');

  const [area, setArea] = useState('');
  const [department, setDepartment] = useState('');
  const [equipment, setEquipment] = useState('');
  const [description, setDescription] = useState('');
  const [reason, setReason] = useState('');
  const [targetHours, setTargetHours] = useState('');

  const [message, setMessage] = useState('');
  const [declarations, setDeclarations] = useState<Declaration[]>([]);
  const [showDeclarations, setShowDeclarations] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, '0')
  );

  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, '0')
  );

  const openStartPicker = () => {
    setSelectedHour('00');
    setSelectedMinute('00');
    setShowStartModal(true);
  };

  const openEndPicker = () => {
    setSelectedHour('00');
    setSelectedMinute('00');
    setShowEndModal(true);
  };

  const confirmStart = () => {
    setStart(`${selectedHour}:${selectedMinute}`);
    setShowStartModal(false);
  };

  const confirmEnd = () => {
    setEnd(`${selectedHour}:${selectedMinute}`);
    setShowEndModal(false);
  };

  const handleSubmit = async () => {
    if (
      !start ||
      !end ||
      !area ||
      !department ||
      !equipment ||
      !description ||
      !reason ||
      !targetHours
    ) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      setMessage('Saving...');

      const response = await fetch(`${API_URL}/declarations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          area: area,
          departement: department,
          description: description,
          equipement: equipment,
          reason: reason,
          date: new Date().toISOString().slice(0, 10),
          start: start,
          end: end,
          targetHours: Number(targetHours),
        }),
      });

      const data = await response.json();

      console.log('BACKEND RESPONSE:', data);

      if (data.success) {
        setMessage('Declaration created successfully!');

        setStart('');
        setEnd('');
        setArea('');
        setDepartment('');
        setEquipment('');
        setDescription('');
        setReason('');
        setTargetHours('');
      } else {
        setMessage(
          data.message || 'Error creating declaration.'
        );
      }
    } catch (error) {
      console.error('BACKEND ERROR:', error);
      setMessage('Cannot connect to backend.');
    }
  };

  const loadDeclarations = async () => {
    try {
      setMessage('Loading declarations...');

      const response = await fetch(
        `${API_URL}/declarations`
      );

      const data = await response.json();

      console.log('DECLARATIONS:', data);

      if (data.success) {
        setDeclarations(data.data);
        setShowDeclarations(true);
        setMessage('');
      } else {
        setMessage('Error loading declarations.');
      }
    } catch (error) {
      console.error('GET ERROR:', error);
      setMessage('Cannot connect to backend.');
    }
  };

  const TimePicker = ({
    visible,
    title,
    onConfirm,
    onCancel,
  }: {
    visible: boolean;
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
  }) => {
    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={onCancel}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              {title}
            </Text>

            <Text style={styles.selectedTime}>
              {selectedHour}:{selectedMinute}
            </Text>

            <View style={styles.pickerContainer}>
              <View style={styles.column}>
                <Text style={styles.columnTitle}>
                  Hour
                </Text>

                <ScrollView style={styles.list}>
                  {hours.map((hour) => (
                    <TouchableOpacity
                      key={hour}
                      style={
                        selectedHour === hour
                          ? styles.selectedItem
                          : styles.timeItem
                      }
                      onPress={() =>
                        setSelectedHour(hour)
                      }
                    >
                      <Text
                        style={
                          selectedHour === hour
                            ? styles.selectedTimeText
                            : styles.timeText
                        }
                      >
                        {hour}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.column}>
                <Text style={styles.columnTitle}>
                  Minute
                </Text>

                <ScrollView style={styles.list}>
                  {minutes.map((minute) => (
                    <TouchableOpacity
                      key={minute}
                      style={
                        selectedMinute === minute
                          ? styles.selectedItem
                          : styles.timeItem
                      }
                      onPress={() =>
                        setSelectedMinute(minute)
                      }
                    >
                      <Text
                        style={
                          selectedMinute === minute
                            ? styles.selectedTimeText
                            : styles.timeText
                        }
                      >
                        {minute}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={onConfirm}
            >
              <Text style={styles.confirmText}>
                Confirm
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerSmall}>
          DOWNTIME MANAGEMENT
        </Text>

        <Text style={styles.title}>
          Create Declaration
        </Text>

        <Text style={styles.subtitle}>
          Report and track equipment downtime
        </Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>
          Downtime Information
        </Text>

        <Text style={styles.label}>
          Start Time
        </Text>

        <TouchableOpacity
          style={styles.timeInput}
          onPress={openStartPicker}
        >
          <Text style={styles.timeIcon}>
            ◷
          </Text>

          <Text
            style={
              start
                ? styles.inputText
                : styles.placeholder
            }
          >
            {start || 'Select start time'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>
          End Time
        </Text>

        <TouchableOpacity
          style={styles.timeInput}
          onPress={openEndPicker}
        >
          <Text style={styles.timeIcon}>
            ◷
          </Text>

          <Text
            style={
              end
                ? styles.inputText
                : styles.placeholder
            }
          >
            {end || 'Select end time'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>
          Area
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter area"
          placeholderTextColor="#999999"
          value={area}
          onChangeText={setArea}
        />

        <Text style={styles.label}>
          Department
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter department"
          placeholderTextColor="#999999"
          value={department}
          onChangeText={setDepartment}
        />

        <Text style={styles.label}>
          Equipment
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter equipment"
          placeholderTextColor="#999999"
          value={equipment}
          onChangeText={setEquipment}
        />

        <Text style={styles.label}>
          Description
        </Text>

        <TextInput
          style={[
            styles.input,
            styles.textArea,
          ]}
          placeholder="Describe what happened..."
          placeholderTextColor="#999999"
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />

        <Text style={styles.label}>
          Reason
        </Text>

        <TextInput
          style={[
            styles.input,
            styles.textArea,
          ]}
          placeholder="Enter the reason..."
          placeholderTextColor="#999999"
          value={reason}
          onChangeText={setReason}
          multiline={true}
        />

        <Text style={styles.label}>
          Target Hours
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter target hours"
          placeholderTextColor="#999999"
          value={targetHours}
          onChangeText={setTargetHours}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>
            Create Declaration
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewButton}
          onPress={loadDeclarations}
        >
          <Text style={styles.viewButtonText}>
            View Declarations
          </Text>
        </TouchableOpacity>

        {message !== '' && (
          <View style={styles.messageBox}>
            <Text style={styles.message}>
              {message}
            </Text>
          </View>
        )}
      </View>

      {showDeclarations && (
        <View style={styles.declarationsContainer}>
          <Text style={styles.listTitle}>
            Recent Declarations
          </Text>

          {declarations.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.noData}>
                No declarations found.
              </Text>
            </View>
          ) : (
            declarations.map((item) => (
              <View
                key={item.id}
                style={styles.declarationCard}
              >
                <Text style={styles.cardTitle}>
                  Declaration #{item.id}
                </Text>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>
                    Area
                  </Text>

                  <Text style={styles.infoValue}>
                    {item.area}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>
                    Department
                  </Text>

                  <Text style={styles.infoValue}>
                    {item.departement}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>
                    Equipment
                  </Text>

                  <Text style={styles.infoValue}>
                    {item.equipement}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>
                    Time
                  </Text>

                  <Text style={styles.infoValue}>
                    {item.start} - {item.end}
                  </Text>
                </View>

                <View style={styles.reasonBox}>
                  <Text style={styles.reasonTitle}>
                    Reason
                  </Text>

                  <Text style={styles.reasonText}>
                    {item.reason}
                  </Text>
                </View>

                <Text style={styles.descriptionText}>
                  {item.description}
                </Text>

                <Text style={styles.targetValue}>
                  Target: {item.targetHours} h
                </Text>
              </View>
            ))
          )}
        </View>
      )}

      <TimePicker
        visible={showStartModal}
        title="Select Start Time"
        onConfirm={confirmStart}
        onCancel={() =>
          setShowStartModal(false)
        }
      />

      <TimePicker
        visible={showEndModal}
        title="Select End Time"
        onConfirm={confirmEnd}
        onCancel={() =>
          setShowEndModal(false)
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },

  content: {
    paddingBottom: 40,
  },

  header: {
    backgroundColor: '#0F4C81',
    paddingTop: 55,
    paddingBottom: 35,
    paddingHorizontal: 22,
  },

  headerSmall: {
    color: '#D8EAF7',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: '800',
  },

  subtitle: {
    color: '#E5EEF6',
    fontSize: 14,
    marginTop: 8,
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    margin: 18,
    padding: 20,
    borderRadius: 18,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#172033',
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#344054',
    marginTop: 16,
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D5DCE5',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: '#172033',
    backgroundColor: '#FAFBFC',
  },

  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },

  timeInput: {
    borderWidth: 1,
    borderColor: '#D5DCE5',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFBFC',
  },

  timeIcon: {
    fontSize: 20,
    color: '#0F4C81',
    marginRight: 10,
  },

  inputText: {
    color: '#172033',
    fontSize: 15,
  },

  placeholder: {
    color: '#999999',
    fontSize: 15,
  },

  button: {
    backgroundColor: '#0F4C81',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  viewButton: {
    backgroundColor: '#E6EFF7',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  viewButtonText: {
    color: '#0F4C81',
    fontSize: 16,
    fontWeight: '800',
  },

  messageBox: {
    marginTop: 15,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#EEF7F0',
  },

  message: {
    textAlign: 'center',
    color: '#217A3A',
    fontWeight: '600',
  },

  declarationsContainer: {
    marginHorizontal: 18,
    marginTop: 5,
  },

  listTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#172033',
    marginBottom: 12,
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
  },

  noData: {
    color: '#777777',
  },

  declarationCard: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 15,
    marginBottom: 14,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#172033',
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  infoLabel: {
    color: '#777777',
    fontSize: 13,
  },

  infoValue: {
    color: '#172033',
    fontSize: 13,
    fontWeight: '700',
    maxWidth: '60%',
    textAlign: 'right',
  },

  reasonBox: {
    backgroundColor: '#FFF7E5',
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
  },

  reasonTitle: {
    color: '#8A6200',
    fontWeight: '800',
    marginBottom: 4,
  },

  reasonText: {
    color: '#5F4A13',
    fontSize: 14,
  },

  descriptionText: {
    color: '#667085',
    marginTop: 12,
    fontSize: 13,
  },

  targetValue: {
    color: '#0F4C81',
    fontWeight: '800',
    marginTop: 12,
    fontSize: 14,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    width: '88%',
    height: '75%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#172033',
    textAlign: 'center',
  },

  selectedTime: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F4C81',
    textAlign: 'center',
    marginVertical: 15,
  },

  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  column: {
    flex: 1,
    marginHorizontal: 5,
  },

  columnTitle: {
    textAlign: 'center',
    fontWeight: '800',
    color: '#344054',
    marginBottom: 6,
  },

  list: {
    borderWidth: 1,
    borderColor: '#D5DCE5',
    borderRadius: 10,
  },

  timeItem: {
    paddingVertical: 11,
    alignItems: 'center',
  },

  selectedItem: {
    paddingVertical: 11,
    alignItems: 'center',
    backgroundColor: '#E6EFF7',
  },

  timeText: {
    color: '#344054',
    fontSize: 16,
  },

  selectedTimeText: {
    color: '#0F4C81',
    fontSize: 16,
    fontWeight: '800',
  },

  confirmButton: {
    backgroundColor: '#0F4C81',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },

  confirmText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  cancelButton: {
    paddingVertical: 11,
    alignItems: 'center',
  },

  cancelText: {
    color: '#667085',
    fontSize: 15,
  },
});