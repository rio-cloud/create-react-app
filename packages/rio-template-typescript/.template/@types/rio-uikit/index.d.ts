declare module 'rio-uikit' {
    import React from 'react';
    import { Button, Tabs, Tab } from 'react-bootstrap';
    import { DatetimepickerProps } from 'react-datetime';
    import { BootstrapTableProps, TableHeaderColumnProps } from 'react-bootstrap-table';
    import { Moment } from 'moment';

    interface ApplicationLayoutProps {
        className?: string;
    }

    interface ApplicationLayoutHeaderProps {
        className?: string;
    }

    interface ApplicationLayoutSidebarProps {
        className?: string;
    }

    interface ApplicationLayoutBodyProps {
        className?: string;
        innerClassName?: string;
        enableScrollToTop?: boolean;
        forceScrollbar?: boolean;
        banner?: any;
    }

    interface ApplicationLayoutBodyBannerProps {
        className?: string;
        textColor?: string;
        backgroundColor?: string;
        isSticky?: boolean;
    }
    class ApplicationLayoutBodyBanner extends React.Component<ApplicationLayoutBodyProps> {}

    class ApplicationLayout extends React.Component<ApplicationLayoutProps> {
        static Header: React.ComponentClass<ApplicationLayoutHeaderProps>;
        static Body: React.ComponentClass<ApplicationLayoutBodyProps>;
        static Sidebar: React.ComponentClass<any>;
    }

    interface ActivityProps {
        activity: string;
        bsSize?: string;
        duration: string | React.ReactNode;
        isOutdated?: boolean;
        onClick?: Function;
        className?: string;
    }

    class Activity extends React.Component<ActivityProps> {}

    interface TreeCategoryProps {
        id: string;
        icon: string;
        label?: string | React.ReactNode;
        hasSelection?: boolean;
    }

    class TreeCategory extends React.Component<TreeCategoryProps> {}

    interface TreeGroup {
        id: string;
        name: string | React.ReactNode;
        icon?: string;
        className?: string;
    }

    interface TreeItemName {
        firstName?: string;
        lastName: string;
    }

    interface TreeItem {
        id: string;
        name: string | React.ReactNode | TreeItemName;
        type: string;
        groupIds?: string[];
        className?: string;
    }

    interface TreeProps {
        groups?: TreeGroup[];
        items?: TreeItem[];
        selectedGroups?: string[];
        selectedItems?: string[];
        onSelectionChange?: Function;
        onItemSelectionChange?: Function;
        onGroupSelectionChange?: Function;
        hasMultiselect?: boolean;
        hideSearch?: boolean;
        searchPlaceholder?: string;
        searchValue?: string;
        search?: JSX.Element;
        summary?: JSX.Element;
        className?: string;
        scrollHeight?: number;
    }

    class Tree extends React.Component<TreeProps> {}

    interface TreeSearchProps {
        value?: string;
        onChange?: Function;
        placeholder?: string;
        className?: string;
    }

    class TreeSearch extends React.Component<TreeSearchProps> {}

    interface TreeSummaryCounts {
        truck?: number;
        trailer?: number;
        bus?: number;
        van?: number;
        driver?: number;
    }

    interface TreeSummaryProps {
        assetCounts: TreeSummaryCounts;
        className?: string;
    }

    class TreeSummary extends React.Component<TreeSummaryProps> {}

    interface AssetTreeProps {
        fly?: boolean;
        resizable?: boolean;
        bordered?: boolean;
        width?: string | number;
        minWidth?: number;
        maxWidth?: number;
        height?: number;
        isOpen?: boolean;
        onToggleTree?: Function;
        currentCategoryId: string;
        onCategoryChange: Function;
        className?: string;
        children?: TreeCategory[];
    }

    class AssetTree extends React.Component<AssetTreeProps> {}

    interface CheckboxProps {
        id?: string;
        name?: string;
        label?: string | React.ReactNode;
        checked?: string | boolean;
        defaultChecked?: string | boolean;
        disabled?: boolean;
        indeterminate?: boolean;
        inline?: boolean;
        onClick?: Function;
        error?: boolean;
        size?: string;
        tabIndex?: number;
        className?: string;
        children?: any;
    }

    class Checkbox extends React.Component<CheckboxProps> {}

    interface ClearableInputProps {
        className?: string;
        inputClassName?: string;
        onChange?: Function;
        onBlur?: Function;
        onClear?: Function;
        onKeyPress?: Function;
        placeholder?: string | React.ReactNode;
        type?: string;
        defaultValue?: string | React.ReactNode;
        value?: string | React.ReactNode;
        maxLength?: number;
        autoComplete?: string;
        inputRef?: React.RefObject<HTMLInputElement>;
    }

    class ClearableInput extends React.Component<ClearableInputProps> {}

    class NotificationsContainer extends React.Component {}

    type notificationTriggerFunction = (
      message: string | JSX.Element | JSX.Element[],
      title?: string,
      timeOut?: number,
      callback?: Function,
      priority?: boolean
    ) => void;

    class Notification {
        static success: notificationTriggerFunction;
        static info: notificationTriggerFunction;
        static warning: notificationTriggerFunction;
        static error: notificationTriggerFunction;
    }

    interface NumberInputProps {
        md?: number;
        sm?: number;
        xs?: number;
        disabled?: boolean;
        onValueChanged?: (value: number) => void;
        value?: number;
        step?: number;
    }

    class NumberInput extends React.Component<NumberInputProps> {}

    interface DatePickerProps extends DatetimepickerProps {
        className?: string;
        locale?: string;
    }

    class DatePicker extends React.Component<DatePickerProps> {}

    interface DateRangePickerCustomPresets {
        startValue: Moment;
        endValue: Moment;
        text: string | JSX.Element;
        onSelect?: Function;
    }

    interface DateRangePickerProps {
        startValue?: Moment;
        endValue?: Moment;
        defaultStartValue?: Moment;
        defaultEndValue?: Moment;
        minValue?: Moment | null;
        maxValue?: Moment | null;
        onRangeChange?: (start: Moment, end: Moment) => void;
        locale: string;
        textDefault?: string;
        textToday?: string;
        textLastWeek?: string;
        textLastMonth?: string;
        textLastYear?: string;
        textCustom?: string;
        textApply?: string;
        textCancel?: string;
        textFrom?: string;
        textTo?: string;
        className?: string;
        dropdownClass?: string;
        dropdownMenuClass?: string;
        hasTimePicker?: boolean;
        customRangeOnly?: boolean;
        customPresets?: DateRangePickerCustomPresets[];
        dropup?: boolean;
        pullRight?: boolean;
        autoDropDirection?: boolean;
    }

    class DateRangePicker extends React.Component<DateRangePickerProps> {}

    interface SidebarProps {
        className?: string;
        title?: string | React.ReactNode;
        closed?: boolean;
        position?: 'left' | 'right';
        onClose?: () => any;
        fly?: boolean;
        titleClassName?: string;
        bodyClassName?: string;
        footer?: string | React.ReactNode;
        resizable?: boolean;
        switchModeBreakpoint?: number;
        width?: string | number;
        minWidth?: number;
        maxWidth?: number;
        footerClassName?: string;
        useBackdrop?: boolean;
        makeBackdropVisible?: boolean;
        onBackDropClick?: Function;
        backdropClassName?: string;
    }

    class Sidebar extends React.Component<SidebarProps> {}

    interface SelectOption {
        id: string;
        label: string | React.ReactNode;
        icon?: any; // TODO
        selected?: boolean;
        disabled?: boolean;
        header?: boolean;
    }

    interface SelectProps {
        options: SelectOption[];
        onChange: (SelectOption) => void;
        id?: string;
        name?: string;
        placeholder?: string | React.ReactNode;
        bsSize?: string;
        disabled?: boolean;
        dropup?: boolean;
        pullRight?: boolean;
        autoDropDirection?: boolean;
        tabIndex?: boolean;
        hasError?: boolean;
        useFilter?: boolean;
        noItemMessage?: string | React.ReactNode;
        showSelectedItemIcon?: boolean;
        showUnselectedIdemIcons?: boolean;
        value?: string[] | undefined;
        className?: string;
    }

    class Select extends React.Component<SelectProps> {}

    interface LabelObject {
        icon: string | React.ReactNode;
        label?: string | React.ReactNode;
    }

    interface SteppedProgressBarProps {
        disableFollowingPages?: number;
        onSelectedChanged: (selectedKey: number) => void;
        labels: LabelObject[];
        selectedStepNumber: number;
    }

    class SteppedProgressBar extends React.Component<SteppedProgressBarProps> {}

    interface RioBootstrapTableProps {
        selectedElements?: any[];
        enableRowSelection?: boolean;
        onSelectionChange?: (selectedElement: any, previousSelectedElement: any) => void;
        clickToSelect?: boolean;
        customSort?: (sortName: string, sortOrder: string) => any[];
        isCaseSensitiv?: boolean;
        singleSelect?: boolean;
        keyField: string;
        striped?: boolean;
        hover?: boolean;
        stickyPosition?: boolean;
        stickyPositionOffset?: string;
    }

    class RioBootstrapTable extends React.Component<RioBootstrapTableProps | BootstrapTableProps> {}

    interface RioTableHeaderColumnProps {
        sortOrder?: string;
    }

    class RioTableHeaderColumn extends React.Component<RioTableHeaderColumnProps | TableHeaderColumnProps> {}

    interface ExpanderPanelProps {
        title: string | React.ReactNode;
        bsStyle?: 'blank' | 'default' | 'primary' | 'info' | 'warning' | 'danger' | 'success';
        iconLeft?: boolean;
        open?: boolean;
        mountOnEnter?: boolean;
        unmountOnExit?: boolean;
        className?: string;
        headerClassName?: string;
        titleClassName?: string;
        bodyClassName?: string;
        onToggle?: Function;
        onEnter?: Function;
        onEntering?: Function;
        onEntered?: Function;
        onExit?: Function;
        onExiting?: Function;
        onExited?: Function;
        children?: React.ReactNode | Function;
    }

    class ExpanderPanel extends React.Component<ExpanderPanelProps> {}

    interface SpinnerProps {
        isInverse?: boolean;
        isDoubleSized?: boolean;
    }

    class Spinner extends React.Component<SpinnerProps> {}

    interface ConfirmationDialogProps {
        show: boolean;
        title: string | React.ReactNode;
        content: string | React.ReactNode;
        onClickConfirm: () => void;
        onClickCancel: () => void;
        cancelButtonText: string | React.ReactNode;
        confirmButtonText: string | React.ReactNode;
        disableConfirm?: boolean;
        useOverflow: boolean;
        bsSize?: bsSize;
    }

    class ConfirmationDialog extends React.Component<ConfirmationDialogProps> {}

    interface SplitDialogProps {
        show: boolean;
        title?: string | React.ReactNode;
        subtitle?: string | React.ReactNode;
        leftContent?: string | React.ReactNode;
        rightContent?: string | React.ReactNode;
        footer?: string | React.ReactNode;
        onClose: () => void;
        useOverflow?: boolean;
        bsSize?: bsSize;
        className?: string;
        bodyClassName?: string;
        footerClassName?: string;
        disableEsc?: boolean;
    }

    class SplitDialog extends React.Component<SplitDialogProps> {}

    interface ActionBarItemIconProps {
        className?: string;
    }

    interface ActionBarItemPopoverProps {
        title?: string | React.ReactNode;
        useOffscreen?: boolean;
        className?: string;
    }

    interface ActionBarItemProps {
        id: string;
        className?: string;
        title?: string | React.ReactNode;
    }

    type ActionBarItemPopoverWidth = 100 | 150 | 200 | 250 | 300 | 350 | 400 | 450 | 500;

    class ActionBarItem extends React.Component<ActionBarItemProps> {
        static Icon: React.ComponentClass<ActionBarItemIconProps>;
        static Popover: React.ComponentClass<ActionBarItemPopoverProps>;
        popoverWidth?: ActionBarItemPopoverWidth;
    }

    interface RadioButtonProps {
        id?: string;
        icon?: string;
        iconSize?: number;
        label?: string | React.ReactNode;
        onClick?: React.MouseEventHandler<{ value: string | string[] | number }>;
        onChange?: Function;
        checked?: boolean;
        defaultChecked?: boolean;
        disabled?: boolean;
        className?: string;
        inline?: boolean;
        right?: boolean;
        name?: string;
        value?: string | string[] | number;
        tabIndex?: number;
        inputRef?: Function;
        children?: any;
    }

    class RadioButton extends React.Component<RadioButtonProps> {}

    type markerColor = 'bg-map-marker-asset' | 'bg-map-marker-poi' | 'bg-map-marker-event';

    interface SingleMapMarkerProps {
        bearing?: number;
        name?: string;
        warningCount?: number;
        exceptionCount?: number;
        active?: boolean;
        moving?: boolean;
        iconNames?: string[];
        markerColor?: markerColor;
    }

    class SingleMapMarker extends React.Component<SingleMapMarkerProps> {}

    interface AutoSuggestInputProps {
        onChange?: (changeEvent: React.SyntheticEvent, changeProps: { newValue: string }) => void;
        onClear: () => void;
        className?: string;
        placeholder?: string | JSX.Element;
        icon?: string;
        hasError?: boolean;
        tabIndex?: number;
        value?: string;
        disabled?: boolean;
        onBlur?: Function;
        inputRef?: Function;
        autoComplete?: string;
    }

    interface AutoSuggestSuggestion {
        [name: string]: any;
    }

    interface SelectedSuggestion {
        highlightedItemIndex: -1;
        suggestionValue: string | React.ReactElement;
        suggestion: AutoSuggestSuggestion;
    }

    interface AutoSuggestProps {
        className?: string;
        dropDownClassName?: string;
        inputProps: AutoSuggestInputProps;
        suggestions: AutoSuggestSuggestion[];
        noItemMessage?: string | JSX.Element;
        onSuggestionsFetchRequested: (argument: { value: string }) => void;
        onSuggestionsClearRequested: () => void;
        onSuggestionSelected: (
          indexOfClickedItemInDropdownList: number,
          selectedSuggestion: SelectedSuggestion
        ) => void;
        renderSuggestion?: (suggestion: AutoSuggestSuggestion) => JSX.Element;
        onSuggestionHighlighted?: () => void;
        getSuggestionValue?: (suggestion: AutoSuggestSuggestion) => string;
        dropup?: boolean;
        pullRight?: boolean;
        autoDropDirection?: boolean;
        dropdownClassName?: string;
        isLoading?: boolean;
        openOnFocus?: boolean;
    }

    class AutoSuggest extends React.Component<AutoSuggestProps> {}

    interface TeaserContainerProps {
        // tslint:disable-next-line:no-any
        children?: any;
        teaserPerRow?: 1 | 2 | 3 | 4 | 6 | 12;
        columnClassName?: string;
        className?: string;
    }

    class TeaserContainer extends React.Component<TeaserContainerProps> {}

    interface TeaserProps {
        headline?: string;
        content?: string | React.ReactNode;
        image?: {
            src: string;
            alt?: string;
            placeholder?: string;
            align?: string;
            onClick?: () => void;
            className?: string;
        };
        button?: {
            text?: string;
            bsStyle?: string;
            onClick?: Function;
            className?: string;
        };
        verticalAlignment?: string;
        segmentation?: string;
        className?: string;
    }

    class Teaser extends React.Component<TeaserProps> {}

    interface SimpleDialogProps {
        show?: boolean;
        title: string;
        content: JSX.Element;
        onClose?: Function;
        bsSize?: bsSize;
    }

    class SimpleDialog extends React.Component<SimpleDialogProps> {}

    interface ModulePropTypes {
        key: string;
        route: React.ReactNode;
    }

    interface ApplicationHeaderProps {
        label?: React.ReactNode;
        homeRoute?: React.ReactNode;
        appNavigator?: React.ReactNode;
        appMenuItems?: ModulePropTypes[];
        navItems?: ModulePropTypes[];
        actionBarItems: React.ReactNode[];
        className?: string;
    }

    class ApplicationHeader extends React.Component<ApplicationHeaderProps> {}

    interface SwitchProps {
        keyName?: string;
        onChange: (toggleState: boolean) => void;
        checked?: boolean;
        minWidth?: number;
        enabledText?: string;
        disabledText?: string;
        labelPosition?: 'left' | 'right';
    }

    class Switch extends React.Component<SwitchProps> {}

    type bsSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'fullscreen';

    interface InfoDialogProps {
        show: boolean;
        content?: React.ReactNode;
        onClose?: Function;
        disableEsc?: boolean;
        bsSize?: bsSize;
        className?: string;
    }

    class InfoDialog extends React.Component<InfoDialogProps> {}

    interface MenuItemsProp {
        value?: string | React.ReactNode;
        disabled?: boolean;
        divider?: boolean;
        header?: boolean;
        onSelect?: (value: string) => void;
    }

    type bsStyle = 'default' | 'primary' | 'info' | 'warning' | 'danger' | 'success' | 'link';

    interface SimpleButtonDropdownProps {
        id?: string;
        title: React.ReactNode | string;
        dropup?: boolean;
        pullRight?: boolean;
        bsSize?: bsSize;
        bsStyle?: bsStyle;
        iconOnly?: boolean;
        noCaret?: boolean;
        splitButton?: boolean;
        autoDropDirection?: boolean;
        items: MenuItemsProp[];
        className?: string;
        disabled?: boolean;
        toggleClassName?: string;
        onLabelButtonClick?: Function;
        customDropdown?: React.ReactNode;
    }

    class SimpleButtonDropdown extends React.Component<SimpleButtonDropdownProps> {}

    interface SliderProps {
        value?: number;
        minValue?: number;
        maxValue?: number;
        valueLabels?: boolean;
        step?: number;
        disabled?: boolean;
        onChange?: Function;
        onDragEnd?: Function;
        className?: string;
    }

    class Slider extends React.Component<SliderProps> {}

    interface NotFoundStateProps {
        headline: string;
        message: string;
    }

    class NotFoundState extends React.Component<NotFoundStateProps> {}

    interface TableViewTogglesProps {
        viewType?: TableViewTogglesValues;
        initialViewType?: TableViewTogglesValues;
        disabledViewTypes?: TableViewTogglesValues[];
        onViewTypeChange: (viewType: TableViewTogglesValues) => void;
        className?: string;
    }

    enum TableViewTogglesValues {
        VIEW_TYPE_SINGLE_CARD = 'SINGLE_CARD',
        VIEW_TYPE_MULTI_CARDS = 'MULTI_CARDS',
        VIEW_TYPE_TABLE = 'TABLE',
    }

    class TableViewToggles extends React.Component<TableViewTogglesProps> {
        public static VIEW_TYPE_SINGLE_CARD: TableViewTogglesValues.VIEW_TYPE_SINGLE_CARD;
        public static VIEW_TYPE_MULTI_CARDS: TableViewTogglesValues.VIEW_TYPE_MULTI_CARDS;
        public static VIEW_TYPE_TABLE: TableViewTogglesValues.VIEW_TYPE_TABLE;
    }

    class TableToolbar extends React.Component<{}> {}

    interface SpinnerInfoBoxProperties {
        text: string;
        isInverse?: boolean;
    }

    class SpinnerInfoBox extends React.Component<SpinnerInfoBoxProperties> {}

    interface ToggleButtonProps {
        active?: boolean;
        bsStyle?: string;
        onClick: Function;
        className?: string;
    }

    class ToggleButton extends React.Component<ToggleButtonProps> {}

    interface FilePickerProps {
        displayMode?: 'button';
        multiple?: boolean; // multi select
        label?: string | React.ReactNode;
        maxSize?: number; // max file size
        onPick: (files: FileList | null) => any;
        className?: string;
        accept?: string;
    }

    class FilePicker extends React.Component<FilePickerProps> {}

    interface StatusBarProps {
        icon?: {
            name: string;
            alignment?: 'left' | 'right';
            color?: string;
            className?: string;
        };
        label?: {
            value: string | React.ReactNode;
            alignment?: 'left' | 'top' | 'right';
            weight?: 'bold' | 'light';
            color?: string;
            className?: string;
        };
        progress?: {
            percentage: number;
            color?: string;
            tooltip?: string | React.ReactNode;
            tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';
            tooltipDelay?: number;
            className?: string;
        }[];
        size?: 'small' | 'large';
        useProgressDivider?: boolean;
        className?: string;
    }

    class StatusBar extends React.Component<StatusBarProps> {}

    interface DataTabsProps {
        activeKey?: string;
        onSelectTab: (tabKey: string) => void;
        mountOnEnter?: boolean;
        unmountOnExit?: boolean;
        tabContentClassName?: string;
        hoverTextColor?: string;
        hoverBgColor?: string;
        activeTextColor?: string;
        activeBgColor?: string;
        bordered?: boolean;
        disableTransition?: boolean;
        commonTabContent?: React.ReactNode;
        className?: string;
    }

    class DataTabs extends React.Component<DataTabsProps> {}

    interface DataTabProps {
        tabKey: string;
        title: string | React.ReactNode;
    }

    class DataTab extends React.Component<DataTabProps> {}

    type tooltipPlacement =
      | 'top-left'
      | 'top'
      | 'top-right'
      | 'right-top'
      | 'right'
      | 'right-bottom'
      | 'bottom-right'
      | 'bottom'
      | 'bottom-left'
      | 'left-bottom'
      | 'left'
      | 'left-top';

    type tooltipWidth = 'auto' | 100 | 150 | 200 | 250 | 300 | 350 | 400 | 450 | 500;

    interface ToolTipProps {
        id?: string | number;
        placement?: tooltipPlacement;
        offsetTop?: string | number;
        offsetLeft?: string | number;
        textAlignment?: 'left' | 'center' | 'right';
        tooltipStyle?: 'default' | 'onboarding';
        className?: string;
        children?: any;
        width?: tooltipWidth;
    }
    class Tooltip extends React.Component<ToolTipProps> {}

    interface OnboardingTipProps {
        id?: string | number;
        placement?: tooltipPlacement;
        show: boolean;
        showCloseIcon?: boolean;
        textAlignment?: 'left' | 'center' | 'right';
        onHide: Function;
        scrollTargetRef?: React.ReactNode;
        hideOnScroll?: boolean;
        useInDialog?: Boolean;
        title?: string | React.ReactNode;
        content?: string | React.ReactNode;
        className?: string;
        children?: any;
        width?: tooltipWidth;
    }
    class OnboardingTip extends React.Component<OnboardingTipProps> {}

    interface DialogProperties {
        show: boolean;
        title: string | React.ReactFragment;
        body: React.ReactNode;
        footer: React.ReactNode;
        className?: string;
        bodyClassName?: string;
        bsSize: string;
        onHide: () => void;
        showCloseButton: boolean;
        useOverflow?: boolean;
    }

    class Dialog extends React.Component<DialogProperties> {
        public static SIZE_FULL_SCREEN: 'SIZE_FULL_SCREEN';
        public static SIZE_FULL: 'SIZE_FULL';
        public static SIZE_LG: 'SIZE_LG';
        public static SIZE_MD: 'SIZE_MD';
        public static SIZE_SM: 'SIZE_SM';
    }

    interface ErrorStateProperties {
        headline: string | React.ReactFragment;
        message?: string | React.ReactFragment;
        className?: string;
        fullWidth?: boolean;
    }

    class ErrorState extends React.Component<ErrorStateProperties> {}

    interface TagProperties {
        size?: string;
        deletable?: boolean;
        clickable?: boolean;
        className?: string;
    }

    interface TableSearchProperties extends ClearableInputProps {}

    class TableSearch extends React.Component<TableSearchProperties> {}

    class Tag extends React.Component<TagProperties> {}

    enum SortDirection {
        ASCENDING = 'asc',
        DESCENDING = 'desc',
    }

    interface SortArrowsProperties {
        direction?: string;
    }

    class SortArrows extends React.Component<SortArrowsProperties> {}

    export {
        ActionBarItem,
        Activity,
        ApplicationHeader,
        ApplicationLayout,
        ApplicationLayoutBodyBanner,
        AssetTree,
        AutoSuggest,
        AutoSuggestProps,
        AutoSuggestSuggestion,
        Button,
        Checkbox,
        ClearableInput,
        ConfirmationDialog,
        DataTab,
        DataTabs,
        DatePicker,
        DatePickerProps,
        DateRangePicker,
        DateRangePickerProps,
        Dialog,
        ErrorState,
        ErrorStateProperties,
        ExpanderPanel,
        FilePicker,
        FilePickerProps,
        InfoDialog,
        LabelObject,
        NotFoundState,
        NotFoundStateProps,
        Notification,
        NotificationsContainer,
        NumberInput,
        NumberInputProps,
        OnboardingTip,
        RadioButton,
        RioBootstrapTable,
        RioBootstrapTableProps,
        RioTableHeaderColumn,
        Select,
        SelectedSuggestion,
        SelectOption,
        SelectProps,
        Sidebar,
        SidebarProps,
        SimpleButtonDropdown,
        SimpleButtonDropdownProps,
        SimpleDialog,
        SingleMapMarker,
        Slider,
        SortArrows,
        SortDirection,
        Spinner,
        SpinnerInfoBox,
        SpinnerInfoBoxProperties,
        SplitDialog,
        StatusBar,
        SteppedProgressBar,
        Switch,
        SwitchProps,
        Tab,
        TableSearch,
        TableToolbar,
        TableViewToggles,
        TableViewTogglesProps,
        TableViewTogglesValues,
        Tabs,
        Tag,
        Teaser,
        TeaserContainer,
        ToggleButton,
        Tooltip,
        Tree,
        TreeSearch,
        TreeSummary,
        TreeCategory,
    };
}
