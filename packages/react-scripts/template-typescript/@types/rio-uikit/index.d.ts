declare module "rio-uikit" {

    import React, { SyntheticEvent } from "react";
    import { Button } from "react-bootstrap";
    import { DatetimepickerProps } from "react-datetime";
    import { BootstrapTableProps, TableHeaderColumnProps } from "react-bootstrap-table";

    interface ApplicationLayoutProps {
        className?: string;
    }

    interface ApplicationLayoutHeaderProps {
        className?: string;
    }

    interface ApplicationLayoutBodyProps {
        className?: string;
    }

    class ApplicationLayout extends React.Component<ApplicationLayoutProps> {
        static Header: React.ComponentClass<ApplicationLayoutHeaderProps>;
        static Body: React.ComponentClass<ApplicationLayoutBodyProps>;
        static Sidebar: React.ComponentClass<any>;
    }

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
    }

    class ClearableInput extends React.Component<ClearableInputProps> {
    }

    class NotificationsContainer extends React.Component {
    }

    class Notification {
        static success(message: string, title?: string, timeOut?: number, callback?: Function, priority?: boolean): void;
        static info(message: string, title?: string, timeOut?: number, callback?: Function, priority?: boolean): void;
        static warning(message: string, title?: string, timeOut?: number, callback?: Function, priority?: boolean): void;
        static error(message: string, title?: string, timeOut?: number, callback?: Function, priority?: boolean): void;
    }

    interface DatePickerProps extends DatetimepickerProps {
        className?: string;
    }

    interface SidebarProps {
        className?: string;
        title: string | JSX.Element;
        closed: boolean;
        position: "left" | "right";
        onClose?: () => any;
        fly?: boolean;
        titleClassName?: string;
        footer: string | JSX.Element;
        resizable: boolean;
        minWidth: number;
        width: number;
    }

    class Sidebar extends React.Component<SidebarProps> {
    }

    class DatePicker extends React.Component<DatePickerProps> {
    }

    interface SelectOption {
        id: string;
        label: string;
        icon?: Object;
        selected?: boolean;
        disabled?: boolean;
    }

    interface SelectProps {
        options: SelectOption[];
        onChange: Function;
        placeholder?: string | React.ReactNode;
        bsSize?: string;
        disabled?: boolean;
        value?: string[] | undefined;
    }

    class Select extends React.Component<SelectProps> {
    }

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

    class SteppedProgressBar extends React.Component<SteppedProgressBarProps> {
    }

    interface RioBootstrapTableProps {
        selectedElements?: Array<any>;
        enableRowSelection?: boolean;
        onSelectionChange?: (selectedElement: any, previousSelectedElement: any) => void;
        clickToSelect?: boolean;
        customSort?: (sortName: string, sortOrder: string) => Array<any>;
        isCaseSensitiv?: boolean;
        singleSelect?: boolean;
        keyField: string;
        striped?: boolean;
        hover?: boolean;
        stickyPosition?: boolean;
        stickyPositionOffset?: string;
    }

    class RioBootstrapTable extends React.Component<RioBootstrapTableProps | BootstrapTableProps> {
    }

    interface RioTableHeaderColumnProps {
        sortOrder?: string;
    }

    class RioTableHeaderColumn extends React.Component<RioTableHeaderColumnProps | TableHeaderColumnProps> {
    }

    interface ExpanderPanelProps {
        title: string | React.ReactNode;
        iconLeft: boolean;
        mountOnEnter: boolean;
        bsStyle: string;
        headerClassName: string;
        bodyClassName: string;
        className: string;
    }

    class ExpanderPanel extends React.Component<ExpanderPanelProps> {

    }

    interface SpinnerProps {
        isInverse?: boolean;
        isDoubleSized?: boolean;
    }

    class Spinner extends React.Component<SpinnerProps> {
    }

    interface ConfirmationDialogProps {
        show: boolean;
        title: string | React.ReactNode;
        content: string | React.ReactNode;
        onClickConfirm: () => void;
        onClickCancel: () => void;
        cancelButtonText: string | React.ReactNode;
        confirmButtonText: string | React.ReactNode;
    }

    class ConfirmationDialog extends React.Component<ConfirmationDialogProps> {

    }

    interface ActionBarItemIconProps {
        className?: string;
    }

    interface ActionBarItemPopoverProps {
        title?: string | React.ReactNode;
        className?: string;
    }

    interface ActionBarItemProps {
        id: string;
        className?: string;
        title?: string | React.ReactNode;
    }

    class ActionBarItem extends React.Component<ActionBarItemProps> {
        static Icon: React.ComponentClass<ActionBarItemIconProps>;
        static Popover: React.ComponentClass<ActionBarItemPopoverProps>;
    }

    interface RadioButtonProps {
        label?: string | React.ReactNode;
        onClick?: React.MouseEventHandler<{value: string | string[] | number}>;
        defaultChecked?: boolean;
        disabled?: boolean;
        className?: string;
        inline?: boolean;
        right?: boolean;
        name: string;
        value?: string | string[] | number;
    }

    class RadioButton extends React.Component<RadioButtonProps> {

    }

    interface SingleMapMarkerProps {
        bearing?: number;
        name?: string;
        warningCount?: number;
        exceptionCount?: number;
        active?: boolean;
        moving?: boolean;
        iconNames?: string[];
        colorClass?: string;
    }

    class SingleMapMarker extends React.Component<SingleMapMarkerProps> {
    }

    interface AutoSuggestInputProps {
        onChange: (changeEvent: SyntheticEvent, changeProps: {newValue: string}) => void;
        onClear: () => void;
        className?: string;
        placeholder?: string;
        icon?: string;
        hasError?: boolean;
        tabIndex?: number;
        value?: string;
        disabled?: boolean;
        onBlur?: Function;
        inputRef?: Function;
    }

    interface AutoSuggestSuggestion {
        [name: string]: any;
    }

    interface SelectedSuggestion {
        highlightedItemIndex: -1;
        suggestionValue: string;
        suggestion: AutoSuggestSuggestion;
    }

    interface AutoSuggestProps {
        className?: string;
        dropDownClassName?: string;
        inputProps: AutoSuggestInputProps;
        suggestions: AutoSuggestSuggestion[];
        noItemMessage: string | JSX.Element;
        onSuggestionsFetchRequested: (argument: {value: string}) => void;
        onSuggestionsClearRequested: () => void;
        onSuggestionSelected: (indexOfClickedItemInDropdownList: number, selectedSuggestion: SelectedSuggestion) => void;
        renderSuggestion: (suggestion: AutoSuggestSuggestion) => JSX.Element;
        onSuggestionHighlighted?: () => void;
        getSuggestionValue: (suggestion: AutoSuggestSuggestion) => string;
        dropup?: boolean;
        pullRight?: boolean;
        autoDropDirection?: boolean;
        dropdownClassName?: string;
        isLoading?: boolean;
    }

    class AutoSuggest extends React.Component<AutoSuggestProps> {

    }

    interface TeaserContainerProps {
        // tslint:disable-next-line:no-any
        children?: any;
        teaserPerRow?: 1 | 2 | 3 | 4 | 6 | 12;
        columnClassName?: string;
        className?: string;
    }

    class TeaserContainer extends React.Component<TeaserContainerProps> {
    }

    interface TeaserProps {
        headline?: string;
        // tslint:disable-next-line:no-any
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

    class Teaser extends React.Component<TeaserProps> {
    }

    interface SimpleDialogProps {
        show?: boolean;
        title: string;
        content: JSX.Element;
        onClose?: Function;
    }

    class SimpleDialog extends React.Component<SimpleDialogProps> {
    }

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
        actionBarItems: Array<React.ReactNode>;
        className?: string;
    }

    class ApplicationHeader extends React.Component<ApplicationHeaderProps> {
    }

    interface NotFoundStateProps {
        headline: string;
        message: string;
    }

    class NotFoundState extends React.Component<NotFoundStateProps> {
    }

    interface TableViewTogglesProps {
        onViewTypeChange: (viewType: string) => void;
    }

    class TableViewToggles extends React.Component<TableViewTogglesProps> {
        public static VIEW_TYPE_SINGLE_CARD: string = "SINGLE_CARD";
        public static VIEW_TYPE_MULTI_CARDS: string = "MULTI_CARDS";
        public static VIEW_TYPE_TABLE: string = "TABLE";
    }

    class TableToolbar extends React.Component<{}> {
    }

    interface SpinnerInfoBoxProperties {
        text: string;
        isInverse?: boolean;
    }

    class SpinnerInfoBox extends React.Component<SpinnerInfoBoxProperties> {
    }

    export {
        ActionBarItem,
        ApplicationHeader,
        ApplicationLayout,
        AutoSuggest,
        AutoSuggestProps,
        AutoSuggestSuggestion,
        Button,
        ClearableInput,
        ConfirmationDialog,
        DatePicker,
        DatePickerProps,
        ExpanderPanel,
        LabelObject,
        NotFoundState,
        Notification,
        NotificationsContainer,
        RadioButton,
        RioBootstrapTable,
        RioBootstrapTableProps,
        RioTableHeaderColumn,
        Select,
        SelectedSuggestion,
        SelectOption,
        Sidebar,
        SidebarProps,
        SimpleDialog,
        SingleMapMarker,
        Spinner,
        SpinnerInfoBox,
        SteppedProgressBar,
        TableToolbar,
        TableViewToggles,
        Teaser,
        TeaserContainer,
    };
}
